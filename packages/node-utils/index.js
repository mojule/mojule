'use strict'

const is = require( '@mojule/is' )

const walk = ( node, cb ) => {
  const nodes = [ node ]

  while( nodes.length ){
    const current = nodes.pop()

    if( cb( current ) ) break

    let child = current.lastChild

    while( child ){
      nodes.push( child )
      child = child.previousSibling
    }
  }
}

const walkUp = ( node, cb ) => {
  while( node ){
    if( cb( node ) ) return

    node = node.parentNode
  }
}

const walkEvery = ( node, predicate, cb ) =>
  walk( node, current => {
    if( predicate( current ) ) cb( current )
  })

const walkDescendants = ( node, predicate, cb ) => {
  let child = node.firstChild

  while( child ){
    if( predicate( child ) ){
      cb( child )
    } else {
      walkDescendants( child, predicate, cb )
    }

    child = child.nextSibling
  }
}

const find = ( node, predicate ) => {
  let result

  walk( node, current => {
    if( predicate( current ) ){
      result = current

      return true
    }
  })

  return result
}

const filter = ( node, predicate ) => {
  const result = []

  walk( node, current => {
    if( predicate( current ) )
      result.push( current )
  })

  return result
}

const findDescendants = ( node, predicate ) => {
  const result = []

  walkDescendants( node, predicate, descendant => {
    result.push( descendant )
  })

  return result
}

const removeAll = node => {
  const result = []

  while( node.firstChild )
    result.push( node.removeChild( node.firstChild ) )

  return result
}

const wrap = ( node, wrapper ) => {
  if( node.parentNode )
    node.parentNode.insertBefore( wrapper, node )

  wrapper.appendChild( node )

  return node
}

const unwrap = node => {
  if( !node.parentNode )
    throw Error( 'Cannot unwrap root node' )

  const parent = node.parentNode

  while( node.firstChild )
    parent.insertBefore( node.firstChild, node )

  parent.removeChild( node )

  return node
}

const serialize = ( node, map = value => value ) => {
  const serialized = [ map( node.value ) ]
  const children = Array.from( node.childNodes )

  serialized.push( ...children.map( current => serialize( current, map ) ) )

  return serialized
}

const deserialize = ( Node, serialized, map = value => value ) => {
  const value = serialized[ 0 ]
  const children = serialized.slice( 1 )

  const node = Node( map( value ) )

  children.forEach( current => {
    const childNode = deserialize( Node, current, map )
    node.appendChild( childNode )
  })

  return node
}

const utils = {
  walk, walkUp, walkEvery, walkDescendants, find, filter, findDescendants,
  removeAll, wrap, unwrap, serialize, deserialize
}

module.exports = utils
