'use strict'

const is = require( '@mojule/is' )
const SymbolTree = require( 'symbol-tree' )

const tree = new SymbolTree( 'Mojule node' )
const valueSymbol = Symbol( 'Mojule node value' )
const apiSymbol = Symbol( 'Mojule node API' )

const toApi = nodeValue => nodeValue[ apiSymbol ]

const Node = ( value, options = {} ) => {
  const { extend } = options

  const nodeValue = { value }

  tree.initialize( nodeValue )

  const ensureParent = child => {
    const parent = tree.parent( child[ valueSymbol ] )

    if( parent !== nodeValue )
      throw Error( 'Not a child of this node' )
  }

  const api = {
    get value() {
      return nodeValue.value
    },
    set value( newValue ){
      nodeValue.value = newValue
    },
    get firstChild() {
      if( !tree.hasChildren( nodeValue ) ) return null

      return tree.firstChild( nodeValue )[ apiSymbol ]
    },
    get lastChild() {
      if( !tree.hasChildren( nodeValue ) ) return null

      return tree.lastChild( nodeValue )[ apiSymbol ]
    },
    get previousSibling() {
      const previous = tree.previousSibling( nodeValue )

      if( !previous ) return null

      return previous[ apiSymbol ]
    },
    get nextSibling() {
      const next = tree.nextSibling( nodeValue )

      if( !next ) return null

      return next[ apiSymbol ]
    },
    get parentNode() {
      const parent = tree.parent( nodeValue )

      if( !parent ) return null

      return parent[ apiSymbol ]
    },
    get childNodes() {
      return tree.childrenToArray( nodeValue ).map( toApi )
    },
    get ancestorNodes() {
      return tree.ancestorsToArray( nodeValue ).map( toApi )
    },
    get index() {
      return tree.index( nodeValue )
    },
    hasChildNodes: () => tree.hasChildren( nodeValue ),
    remove: () => toApi( tree.remove( nodeValue ) ),
    removeChild: child => {
      ensureParent( child )

      return toApi( tree.remove( child[ valueSymbol ] ) )
    },
    insertBefore: ( newNode, referenceNode ) => {
      ensureParent( referenceNode )

      tree.remove( newNode[ valueSymbol ] )

      return toApi( tree.insertBefore(
        referenceNode[ valueSymbol ], newNode[ valueSymbol ]
      ))
    },
    insertAfter: ( newNode, referenceNode ) => {
      ensureParent( referenceNode )

      tree.remove( newNode[ valueSymbol ] )

      return toApi( tree.insertAfter(
        referenceNode[ valueSymbol ], newNode[ valueSymbol ]
      ))
    },
    prependChild: newNode => {
      tree.remove( newNode[ valueSymbol ] )

      return toApi( tree.prependChild( nodeValue, newNode[ valueSymbol ] ) )
    },
    appendChild: newNode => {
      tree.remove( newNode[ valueSymbol ] )

      return toApi( tree.appendChild( nodeValue, newNode[ valueSymbol ] ) )
    }
  }

  api[ valueSymbol ] = nodeValue
  nodeValue[ apiSymbol ] = api

  if( is.function( extend ) )
    extend( api, nodeValue, tree, valueSymbol )

  return api
}

module.exports = Node