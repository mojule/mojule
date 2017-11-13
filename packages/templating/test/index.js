'use strict'

const assert = require( 'assert' )
const domUtils = require( '@mojule/dom-utils' )
const utils = require( '@mojule/utils' )
const document = require( '@mojule/document' )
const Templating = require( '../src' )

const {
  parse, stringify, removeWhitespace, normalizeWhitespace, walk
} = domUtils
const { clone } = utils
const { GetTemplates } = Templating

const fixtureNames = [
  'text', 'text-attr', 'raw', 'raw-attr', 'attr', 'attr-attr', 'dataset',
  'dataset-attr', 'classes', 'classes-attr', 'classname', 'classname-attr',
  'include', 'include-attr', 'each', 'each-attr', 'if', 'if-attr', 'not',
  'not-attr', 'paths', 'paths-attr', 'tagname', 'simple', 'kitchen-sink',
  'array-model', 'switch', 'switch-attr', 'collapse', 'collapse-attr',

  'person', 'node', 'nested-include'
]

const skipStrict = [
  'if', 'if-attr', 'not', 'not-attr', 'paths', 'paths-attr', 'node',
  'nested-include', 'person', 'simple', 'kitchen-sink', 'array-model', 'switch',
  'switch-attr', 'collapse', 'collapse-attr'
]

const skipNormalize = [ 'collapse' ]

const normalizedString = node => {
  normalizeWhitespace( node )
  removeWhitespace( node )

  return stringify( node )
}

const getFixture = name => {
  const expectStr = require( `./fixtures/${ name }/expect` )
  const expect = skipNormalize.includes( name ) ?
    expectStr : normalizedString( parse( document, expectStr ) )

  return {
    expect,
    template: parse( document, require( `./fixtures/${ name }/template` ) ),
    model: require( `./fixtures/${ name }/model` )
  }
}

const fixtures = fixtureNames.reduce( ( obj, name ) => {
  obj[ name ] = getFixture( name )

  return obj
}, {})

const templates = fixtureNames.reduce( ( obj, name ) => {
  obj[ name ] = fixtures[ name ].template

  return obj
}, {})

const options = { document, strict: false }
const strictOptions = { document, strict: true }
const noCacheOptions = { document, strict: false, useCache: false }

const populate = Templating( templates, options )
const populateStrict = Templating( templates, strictOptions )

const testFixture = name => {
  it( name, () => {
    const expect = fixtures[ name ].expect
    const dom = populate( name, fixtures[ name ].model )
    const html = skipNormalize.includes( name ) ? stringify( dom ) : normalizedString( dom )

    assert.strictEqual( html, expect )
  })

  if( name === 'include' ){
    const included = []

    const includeOptions = { document, strict: false, onInclude: ( name, node ) => {
      included.push( name )
    }}

    const populateInclude = Templating( templates, includeOptions )

    it( 'include calls onInclude', () => {
      populateInclude( name, fixtures[ name ].model )

      assert.deepEqual( included, [ 'person', 'missing', 'person', 'person' ] )
    })
  }

  if( skipStrict.includes( name ) ){
    it( name + ' strict does not throw', () => {
      assert.doesNotThrow( () => {
        populateStrict( name, fixtures[ name ].model )
      }, TypeError )
    })
  } else {
    it( name + ' strict throws', () => {
      assert.throws( () => {
        populateStrict( name, fixtures[ name ].model )
      }, TypeError )
    })
  }
}

describe( 'populators', () => {
  fixtureNames.forEach( testFixture )
})

describe( 'Templating', () => {
  it( 'fails without document', () => {
    assert.throws( () => Templating( templates ) )
  })
})

describe( 'cache', () => {
  it( 'works with no cache', () => {
    const populateNoCache = Templating( templates, noCacheOptions )

    const fromCached = normalizedString( populate( 'text', fixtures.text.model ) )
    const fromUncached = normalizedString( populateNoCache( 'text', fixtures.text.model ) )

    assert.strictEqual( fromCached, fromUncached )
  })
})

describe( 'get templates', () => {
  const template = require( './fixtures/get-templates/template' )
  const model = require( './fixtures/get-templates/model' )
  const expectStr = require( './fixtures/get-templates/expect' )
  const expect = normalizedString( parse( document, expectStr ) )
  const getTemplates = GetTemplates( { document } )

  it( 'has templates', () => {
    const templates = getTemplates( template )
    const populate = Templating( templates, options )
    const html = normalizedString( populate( 'second', model ) )

    assert.strictEqual( html, expect )
  })

  it( 'already parsed node', () => {
    const parsedTemplate = parse( document, template )
    const templates = getTemplates( parsedTemplate )
    const populate = Templating( templates, options )
    const html = normalizedString( populate( 'second', model ) )

    assert.strictEqual( html, expect )
  })
})

describe( 'options', () => {
  const excludeStrict = [ 'if', 'not', 'some', 'include' ]
  const excludeStrictOptions = { document, strict: true, excludeStrict }
  const populateExcludeStrict = Templating( templates, excludeStrictOptions )

  it( 'can excludeStrict specific tokens', () => {
    assert.doesNotThrow( () => {
      populateExcludeStrict( 'include', fixtures.include.model )
    })
  })

  it( 'can excludeFromCache', () => {
    assert.doesNotThrow( () => {
      populateExcludeStrict( 'include', fixtures.include.model )
      populateExcludeStrict.excludeFromCache( 'include' )
      populateExcludeStrict( 'include', fixtures.include.model )
    })
  })

  it( 'no remove', () => {
    const noRemoveFixture = getFixture( 'no-remove' )
    const noRemoveTemplates = {
      'no-remove': noRemoveFixture.template
    }
    const noRemoveOptions = { document, removeTokens: false }
    const populateNoRemove = Templating( noRemoveTemplates, noRemoveOptions )

    const { expect, model } = noRemoveFixture

    const dom = populateNoRemove( 'no-remove', model )
    const html = normalizedString( dom )

    assert.strictEqual( html, expect )
  })

  // process and remove but do not call populate
  it( 'non populator', () => {
    const Token = require( '../src/token' )
    let tokens = require( '../src/tokens' )

    const nope = Token({ isPopulator: false })

    tokens = Object.assign( {}, tokens, { nope } )

    const nonPopulatorFixture = getFixture( 'non-populator' )
    const nonPopulatorTemplates = {
      'non-populator': nonPopulatorFixture.template
    }
    const nonPopulatorOptions = { document, tokens }
    const populateNonPopulator = Templating( nonPopulatorTemplates, nonPopulatorOptions )

    const { expect, model } = nonPopulatorFixture

    const dom = populateNonPopulator( 'non-populator', model )
    const html = normalizedString( dom )

    assert.strictEqual( html, expect )
  })

  it( 'custom populators', () => {
    const LogPopulator = require( './fixtures/log-populator' )

    let populators = require( '../src/populators' )

    populators = Object.keys( populators ).reduce( ( obj, tokenName ) => {
      obj[ tokenName ] = LogPopulator( populators[ tokenName ] )

      return obj
    }, {})

    const populatorOptions = { document, populators, strict: false }
    const logTemplating = Templating( templates, populatorOptions )

    logTemplating( 'simple', fixtures.simple.model )

    const { log } = LogPopulator

    const expect = [
      {
        tokenName: 'text',
        action: 'set',
        attributeName: 'text',
        attributeValue: 'textField',
        path: '/textField',
        value: 'foo'
      },
      {
        tokenName: 'if',
        action: 'object',
        attributeName: '',
        attributeValue: 'textField',
        path: '/textField',
        value: 'foo'
      }
    ]

    assert.deepEqual( log, expect )
  })
})

describe( 'template-to-fields', () => {
  const populators = require( '../src/populators' )
  const tokens = require( '../src/tokens' )
  const templateToFields = require( '../src/template-to-fields' )

  it( 'kitchen-sink', () => {
    const name = 'kitchen-sink'

    const getTemplate = name => templates[ name ].cloneNode( true )

    const fields = templateToFields( name, { getTemplate, populators, tokens, document })
    const fields2 = populate.toFields( name )

    const expect = [
      {
        "path": "/subheaderTag",
        "type": "string"
      },
      {
        "path": "/people",
        "type": "array"
      },
      {
        "path": "/peopleClass",
        "type": "string"
      },
      {
        "path": "/peopleDataFoo",
        "type": "string"
      },
      {
        "path": "/people",
        "type": "array"
      },
      {
        "path": "/sectionClasses",
        "type": "stringArray"
      },
      {
        "path": "/people/0/firstName",
        "type": "string"
      },
      {
        "path": "/people/0/lastName",
        "type": "string"
      },
      {
        "path": "/people/0",
        "type": "stringMap"
      }
    ]

    assert.deepEqual( fields, expect )
    assert.deepEqual( fields, fields2 )
  })

  it( 'node', () => {
    const name = 'node'

    const getTemplate = name => templates[ name ].cloneNode( true )

    const fields = templateToFields( name, { getTemplate, populators, tokens, document })

    const expect = [
      {
        "path": "/value",
        "type": "string"
      },
      {
        "path": "/children",
        "type": "array"
      },
      {
        "path": "/children/0/value",
        "type": "string"
      },
      {
        "path": "/children/0/children",
        "type": "array"
      },
      {
        "path": "/children/0/children/0/value",
        "type": "string"
      },
      {
        "path": "/children/0/children/0/children",
        "type": "array"
      }
    ]

    assert.deepEqual( fields, expect )
  })
})

it( 'unexpected each action', () => {
  const model = {
    foo: 'Foo'
  }

  const html = `
    <div each-string="foo">
      <span text="."></span>
    </div>
  `

  const template = parse( document, html )
  const templates = { eachString: template }
  const populate = Templating( templates, options )

  assert.throws( () => populate( 'eachString', model ) )
})
