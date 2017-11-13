'use strict'

const assert = require( 'assert' )
const utils = require( '../src' )

describe( 'test utils', () => {
  it( 'should generate a unique identifier', () => {
    let result = utils.id()
    assert.equal( result.length, 32, 'Default length should be 32' )
    const prefix = 'aaaa'
    result = utils.id( prefix )
    assert.equal( result.length, prefix.length + 1 + 32 )
    assert( result.startsWith( prefix + '-' ) )
  } )
  it( 'should make a proposed identifier string safe', () => {
    let result = utils.identifier()
    assert.equal( result, '' )
    result = utils.identifier( '&&&&' )
    assert.equal( result, '' )
    result = utils.identifier( 'ABCD', true )
    assert.equal( result, 'ABCD' )
    result = utils.identifier( 'ABCD1234' )
    assert.equal( result, 'abcd1234' )
    result = utils.identifier( '~A!B@C#D$E%F^G&H*(1)2_3+' )
    assert.equal( result, 'a-b-c-d-e-f-g-h-1-2-3' )
  } )
  it( 'should escape < in string', () => {
    let result = utils.escapeHtml()
    assert.equal( result, '' )
    result = utils.escapeHtml( 'ab cd' )
    assert.equal( result, 'ab cd' )
    result = utils.escapeHtml( '<ab> <cd>' )
    assert.equal( result, '&lt;ab> &lt;cd>' )
  } )
  it( 'should capitalize the first letter in string', () => {
    let result = utils.capitalizeFirstLetter()
    assert.equal( result, '' )
    result = utils.capitalizeFirstLetter( 'a' )
    assert.equal( result, 'A' )
    result = utils.capitalizeFirstLetter( 'WTF' )
    assert.equal( result, 'WTF' )
    result = utils.capitalizeFirstLetter( 'hello' )
    assert.equal( result, 'Hello' )
  } )
  it( 'should clone an object', () => {
    const nested = { 'd1': 1 }
    const obj = {
      'a': 1,
      'b': 2,
      'c': () => { false },
      'd': nested
    }
    const result = utils.clone( obj )
    assert.notDeepEqual( result, obj )
    assert.deepEqual( result.d, nested )
    assert( Object.keys( result ).length === 3 )
  } )
  it( 'should return true if source object properties match values in test object', () => {
    const obj = {
      'a': 1,
      'b': 2,
      'c': 3,
      'd': 4
    }
    const source = {
      'a': 1,
      'b': 2,
      'c': 3
    }
    let result = utils.matches( obj )
    assert( result )
    result = utils.matches( obj, source )
    assert( result )
    source.e = 5
    result = utils.matches( obj, source )
    assert( !result )
  } )
  it( 'should convert hyphenated string to CamelCase string', () => {
    let result = utils.hyphenatedToCamelCase()
    assert.equal( result, '' )
    result = utils.hyphenatedToCamelCase( 'input-radio-icon' )
    assert.equal( result, 'inputRadioIcon' )
    result = utils.hyphenatedToCamelCase( 'input-radio-icon', true )
    assert.equal( result, 'InputRadioIcon' )
    result = utils.hyphenatedToCamelCase( 'INPUT' )
    assert.equal( result, 'INPUT' )
    result = utils.hyphenatedToCamelCase( '-A-b-c' )
    assert.equal( result, 'ABC' )
  } )
  it( 'should convert camelCase string to hyphenated', () => {
    let result = utils.camelCaseToHyphenated()
    assert.equal( result, '' )
    result = utils.camelCaseToHyphenated( 'inputRadioIcon' )
    assert.equal( result, 'input-radio-icon' )
    result = utils.camelCaseToHyphenated( 'ABC' )
    assert.equal( result, '-a-b-c' )
  } )
  it( 'should generate integer ranges', () => {
    let result
    result = utils.range()
    assert.deepEqual( result, [] )
    result = utils.range( 3 )
    assert.deepEqual( result, [ 0, 1, 2 ] )
    result = utils.range( -3 )
    assert.deepEqual( result, [ 0, -1, -2 ] )
    result = utils.range( 0, 3 )
    assert.deepEqual( result, [ 0, 1, 2, 3 ] )
    result = utils.range( 4, 4 )
    assert.deepEqual( result, [ 4 ] )
    result = utils.range( -1, -3 )
    assert.deepEqual( result, [ -1, -2, -3 ] )
    result = utils.range( -1, 1 )
    assert.deepEqual( result, [ -1, 0, 1 ] )
    result = utils.range( 1, -1 )
    assert.deepEqual( result, [ 1, 0, -1 ] )
  } )
} )

