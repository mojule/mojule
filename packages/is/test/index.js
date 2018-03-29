'use strict'

const assert = require( 'assert' )
const Is = require( '../dist' )

const { is, extendDefaults, Utils, utils } = Is

describe( 'Default Predicates', () => {
  const valid = {
    number: 1.1,
    integer: 1,
    string: '',
    boolean: true,
    array: [],
    null: null,
    undefined: undefined,
    function: () => {},
    object: { a: 1 },
    empty: {}
  }

  const exceptions = {
    number: [ 'integer' ],
    object: [ 'empty' ]
  }

  const predicateNames = Object.keys( valid )

  predicateNames.forEach( name => {
    it( 'valid ' + name, () => {
      assert( is[ name ]( valid[ name ] ) )
    })

    const invalid = predicateNames.filter( current => current !== name )

    invalid.forEach( invalidName => {
      if ( exceptions[ name ] && exceptions[ name ].includes( invalidName ) ) return

      it( `invalid for ${ name }, ${ invalidName }`, () => {
        assert( !is[ name ]( valid[ invalidName ] ) )
      })
    })
  })

  describe( 'Predicate set', () => {
    it( 'is one type and one type only', () => {
      assert( utils.isOnly( i => i + 1, 'function' ) )
      assert( utils.isOnly( undefined, 'undefined' ) )
      assert( utils.isOnly( true, 'boolean' ) )
      assert( utils.isOnly( [], 'array' ) )
      assert( !utils.isOnly( 1, 'integer' ) )
    })

    it( 'has some of the types', () => {
      assert( utils.some( {}, 'array', 'object' ) )
      assert( !utils.some( '', 'array', 'object' ) )
    })

    it( 'has all the types', () => {
      assert( utils.every( 1, 'number', 'integer' ) )
      assert( !utils.every( 1.1, 'number', 'integer' ) )
    })

    it( 'gets the first matching type', () => {
      assert.equal( utils.of( [] ), 'array' )
      assert.notEqual( utils.of( [] ), 'object' )
    })

    it( 'gets all matching types', () => {
      assert.deepEqual( utils.allOf( {}), [ 'object', 'empty' ] )
      assert.deepEqual( utils.allOf( 1 ), [ 'number', 'integer' ] )
    })

    it( 'has the right types', () => {
      assert.deepEqual( utils.types(), [
        'number',
        'integer',
        'string',
        'boolean',
        'array',
        'null',
        'undefined',
        'function',
        'object',
        'empty'
      ])
    })
  })
})

describe( 'Custom predicates', () => {
  const predicates = {
    objectWithStringId: subject => is.object( subject ) && is.string( subject.id ),
    // silly to call it integer when testing for positive, but just for test
    integer: subject => is.integer( subject ) && subject >= 0
  }

  const customIs = extendDefaults( predicates )
  const customUtils = Utils( customIs )

  it( 'Default predicates still present', () => {
    assert( customIs.string( '' ) )
  })

  it( 'Overrides default predicate', () => {
    assert( customIs.integer( 1 ) )
    assert( !customIs.integer( -1 ) )
  })

  it( 'custom predicates take precedence', () => {
    const objectWithStringId = { id: '' }

    assert.strictEqual( customUtils.of( objectWithStringId ), 'objectWithStringId' )
  })

  describe( 'Object with string id', () => {
    const pass = { id: '' }
    const fail = [ {}, '', { id: 42 }]

    it( `Accepts ${JSON.stringify( pass )}`, () => {
      assert( customIs.objectWithStringId( pass ) )
    })

    fail.forEach( subject => {
      it( `Rejects ${JSON.stringify( subject )}`, () => {
        assert( !customIs.objectWithStringId( subject ) )
      })
    })
  })
})
