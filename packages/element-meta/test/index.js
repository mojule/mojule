'use strict'

const assert = require( 'assert' )
const tv4 = require( 'tv4' )
const data = require( '../src/data.json' )
const schema = require( '../src/schema.json' )
const elementMeta = require( '..' )

describe( 'element metadata', () => {
  it( 'data.json matches schema', () => {
    assert( tv4.validate( data, schema ) )
  })

  it( 'exported object matches schema', () => {
    assert( tv4.validate( elementMeta(), schema ) )
  })
})
