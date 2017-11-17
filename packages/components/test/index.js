'use strict'

const assert = require( 'assert' )
const fs = require( 'fs' )
const document = require( '@mojule/document' )
const domUtils = require( '@mojule/dom-utils' )
const is = require( '@mojule/is' )
const Mmon = require( '@mojule/mmon' )
const Node = require( '@mojule/node' )
const nodeUtils = require( '@mojule/node-utils' )
const jsdom = require( 'jsdom' )
const Components = require( '../src' )

const { stringify } = domUtils
const { ReadComponents } = Components

const options = { document, fs }

const readComponents = ReadComponents( options )

describe( 'Components', () => {
  let componentApi

  it( 'gets components', done => {
    readComponents( './test/fixtures/components', ( err, components ) => {
      if( err ) done( err )

      assert( is.object( components ) )
      assert( Object.keys( components ).length > 0 )

      componentApi = Components( components, { document } )

      done()
    })
  })

  it( 'gets dom', () => {
    const mmon = `
document>
  title: Home
  header>
    links[]
      {}
        title: Home
        uri: /
      {}
        title: "Contact Us"
        uri: /contact-us
  main>
  footer>
    `

    const modelTree = nodeUtils.deserialize( Node, Mmon.parse( mmon ) )
    const rendered = componentApi.render( modelTree )
    const html = stringify( rendered.node )

    assert( is.string( html ) && html.length > 0 )
  })

  it( 'getData miss', () => {
    assert.equal( componentApi.getTemplate( 'nope' ), undefined )
  })

  it( 'bad component path', done => {
    readComponents( 'nope', err => {
      assert( err )
      done()
    })
  })

  it( 'from model tree', () => {
    const mmon = `
document>
  styles[]
    {}
      text: body{}
    {}
      uri: /css
  main>
    `

    const parsed = Mmon.parse( mmon )
    const modelTree = nodeUtils.deserialize( Node, parsed )
    const rendered = componentApi.render( modelTree )
    const html = stringify( rendered.node )

    assert( is.string( html ) && html.length > 0 )
  })
})
