'use strict'

const isTokenElement = ( tokenNames, node ) =>
  tokenNames.includes( node.nodeName.toLowerCase() )

module.exports = isTokenElement
