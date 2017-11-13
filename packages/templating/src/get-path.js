'use strict'

const domUtils = require( '@mojule/dom-utils' )
const path = require( '@mojule/path' )

const { find, walkUp } = domUtils

const isContextElement = node => node.nodeType === 1 && node.hasAttribute( 'path' )

const ancestors = node => {
  const chain = []

  walkUp( node, current => {
    if( isContextElement( current ) || node === current )
      chain.unshift( current )
  })

  return chain
}

const getPath = ( current, pathAttribute = 'path' ) => {
  const chain = ancestors( current )

  const segments = chain.map( el => {
    const currentPath = el === current ?
      el.getAttribute( pathAttribute ) : el.getAttribute( 'path' )

    return currentPath || ''
  })

  const modelPath = path.resolve( '/', ...segments )

  if( modelPath === '/' ) return ''

  return modelPath
}

module.exports = getPath
