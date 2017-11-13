'use strict'

const domUtils = require( '@mojule/dom-utils' )
const isTokenElement = require( './is-token-element' )

const { find, walkUp } = domUtils

const firstElementChild = ( tokenNames, node ) => {
  return find( node, current =>
    current.nodeType === 1 && !isTokenElement( tokenNames, current )
  )
}

const eachElementChild = ( tokenNames, node, callback ) => {
  let target = firstElementChild( tokenNames, node )

  while( target ){
    const current = target

    target = target.nextSibling

    if( current.nodeType === 1 && !isTokenElement( tokenNames, current ) ){
      callback( current )
    }
  }
}

module.exports = eachElementChild
