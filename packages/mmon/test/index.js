'use strict'

const assert = require( 'assert' )
const fs = require( 'fs' )
const pify = require( 'pify' )
const MMON = require( '../src' )
const expect = require( './fixtures/kitchensink.json' )

const { readFile, writeFile } = pify( fs )

describe( 'MMON', () => {
  describe( 'parse', () => {
    it( 'parses models', () =>
      readFile( './test/fixtures/kitchensink.mmon', 'utf8' )
      .then( mmon => MMON.parse( mmon ) )
      .then( obj => {
        assert.deepEqual( expect, obj )
      })
    )

    it( 'parses objects', () => {
      const mmon = `{}
        foo: 1
        bar: abc
      `
      const expect = {
        foo: 1,
        bar: 'abc'
      }

      const obj = MMON.parse( mmon )

      assert.deepEqual( expect, obj )
    })

    it( 'bad nesting', () => {
      const mmon = `
          {}
        foo: 1
      `
      assert.throws( () => MMON.parse( mmon ) )
    })

    it( 'unexpected line', () => {
      const mmon = `{}
        foo
      `

      assert.throws( () => MMON.parse( mmon ) )
    })
  })
})
