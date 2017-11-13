'use strict'

const lodashRange = require( 'lodash.range' )

const clone = ( obj = {} ) => JSON.parse( JSON.stringify( obj ) )

const matches = ( obj = {}, source = {} ) =>
  Object.keys( source ).every( key => obj[ key ] === source[ key ] )

const id = ( prefix = '', length = 32 ) => {
  if( prefix )
    prefix = identifier( prefix ) + '-'

  let str = prefix

  for( let i = 0; i < length; i++ ) {
    str += Math.floor( Math.random() * 16 ).toString( 16 )
  }

  return str
}

const identifier = ( value = '', caseSensitive = false ) => {
  let id = value.replace( /[^a-z0-9]/gi, '-' ).replace( /-{2,}/g, '-' ).replace( /^-/i, '' ).replace( /-$/i, '' )

  if( !caseSensitive )
    id = id.toLowerCase()

  return id
}

const escapeHtml = ( str = '' ) => {
  const result = str.replace( /</g, '&lt;' )
  return result
}

const capitalizeFirstLetter = ( str = '' ) =>
  str.charAt( 0 ).toUpperCase() + str.slice( 1 )

const hyphenatedToCamelCase = ( str = '', capitalizeFirst = false ) => {
  let [ head, ...rest ] = str.split( '-' )

  if( capitalizeFirst )
    head = capitalizeFirstLetter( head )

  const capitalized = rest.map( capitalizeFirstLetter )

  return [ head, ...capitalized ].join( '' )
}

const camelCaseToHyphenated = ( str = '' ) =>
  str.replace( /([A-Z])/g, matches => `-${matches[ 0 ].toLowerCase()}` )


const range = ( start = 0, end ) => {
  if( typeof end === 'undefined' ) {
    return lodashRange( start )
  }
  else {
    const step = start <= end ? 1 : -1
    const normEnd = end >= 0 ? end + 1 : end - 1
      return lodashRange( start, normEnd, step )
  }
}


const utils = {
  id, identifier, matches, clone, escapeHtml, capitalizeFirstLetter,
  hyphenatedToCamelCase, camelCaseToHyphenated, range
}

module.exports = utils
