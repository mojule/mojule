'use strict'

const Node = require( '@mojule/node' )
const parse = require( './src/parse' )
const stringify = require( './src/stringify' )

const extend = ( api, nodeValue ) => {
  Object.defineProperty( api, 'value', {
    get: () => nodeValue.value,
    set: value => {
      nodeValue.value = String( value )
    }
  })
}

const StringNode = value => {
  value = String( value )

  const node = Node( value, { extend } )

  return node
}

StringNode.stringify = stringify
StringNode.parse = ( str, options ) => parse( StringNode, str, options )

module.exports = StringNode
