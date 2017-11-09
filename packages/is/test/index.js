'use strict'

// Enable intellisense to check typings while implementing tests.
/// <reference path="../typings/index.d.ts" />

const assert = require( 'assert' )
const Is = require( '../src' )

describe( 'Default Predicates', () => {
  const valid = {
    number: 1.1,
    integer: 1,
    string: '',
    boolean: true,
    array: [],
    null: null,
    undefined: undefined,
    function: () => { },
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
      assert( Is[ name ]( valid[ name ] ) )
    } )

    const invalid = predicateNames.filter( current => current !== name )

    invalid.forEach( invalidName => {
      if( exceptions[ name ] && exceptions[ name ].includes( invalidName ) )
        return

      it( `invalid for ${name}, ${invalidName}`, () => {
        assert( !Is[ name ]( valid[ invalidName ] ) )
      } )
    } )
  } )

  describe( 'Predicate set', () => {

    // const jsPredicates = {
    //   number: subject => typeof subject === 'number',
    //   string: subject => typeof subject === 'string',
    //   boolean: subject => typeof subject === 'boolean',
    //   array: subject => Array.isArray( subject ),
    //   null: subject => subject === null,
    //   object: subject => typeof subject === 'object',
    //   undefined: subject => subject === undefined
    // }

    const is = Is()

    it( 'is one type and one type only', () => {
      assert( is.isOnly( i=>i+1, 'function' ) )
      assert( is.isOnly( undefined, 'undefined' ) )
      assert( is.isOnly( true, 'boolean' ) )
      assert( is.isOnly( [], 'array' ) )
      assert( !is.isOnly( 1, 'integer' ) )
    } )

    it( 'has some of the types', () => {
      assert( is.some( {}, 'array', 'object' ) )
      assert( !is.some( '', 'array', 'object' ) )
    } )

    it( 'has all the types', () => {
      assert( is.every( 1, 'number', 'integer' ) )
      assert( !is.every( 1.1, 'number', 'integer' ) )
    } )

    it( 'gets the first matching type', () => {
      assert.equal( is.of( [] ), 'array' )
      assert.notEqual( is.of( [] ), 'object' )
    } )

    it( 'gets all matching types', () => {
      assert.deepEqual( is.allOf( {} ), [ 'object', 'empty' ] )
      assert.deepEqual( is.allOf( 1 ), [ 'number', 'integer' ] )
    } )

    it( 'has the right types', () => {
      assert.deepEqual( is.types(), [ 'number', 'integer', 'string', 'boolean', 'array', 'null', 'undefined', 'function', 'object', 'empty' ] )
    } )

  } )
} )

describe( 'Custom predicates', () => {
  const predicates = {
    objectWithStringId: subject => Is.object( subject ) && Is.string( subject.id ),
    // silly to call it integer when testing for positive, but just for test
    integer: subject => Is.integer( subject ) && subject >= 0
  }

  const is = Is( predicates )

  it( 'Default predicates still present', () => {
    assert( is.string( '' ) )
  } )

  it( 'Overrides default predicate', () => {
    assert( is.integer( 1 ) )
    assert( !is.integer( -1 ) )
  } )

  it( 'custom predicates take precedence', () => {
    const objectWithStringId = { id: '' }

    assert.strictEqual( is.of( objectWithStringId ), 'objectWithStringId' )
  })

  describe( 'Object with string id', () => {
    const pass = { id: '' }
    const fail = [ {}, '', { id: 42 }]

    it( `Accepts ${JSON.stringify( pass )}`, () => {
      assert( is.objectWithStringId( pass ) )
    } )

    fail.forEach( subject => {
      it( `Rejects ${JSON.stringify( subject )}`, () => {
        assert( !is.objectWithStringId( subject ) )
      } )
    } )
  } )
} )



