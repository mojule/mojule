'use strict'

const populateEach = ({ node, populateAction, document }) => {
  const fragment = document.createDocumentFragment()

  while( node.firstChild )
    fragment.appendChild( node.firstChild )

  const { action, path, value = [] } = populateAction

  if( action === 'array' ){
    value.forEach( ( current, index ) => {
      const context = document.createElement( 'context' )

      context.setAttribute( 'path', `/${ path }/${ index }` )
      context.appendChild( fragment.cloneNode( true ) )

      node.appendChild( context )
    })
  } else if( action === 'object' ){
    Object.keys( value ).forEach( key => {
      const keyvalue = document.createElement( 'keyvalue' )

      keyvalue.setAttribute( 'key', key )
      keyvalue.setAttribute( 'path', `/${ path }/${ key }` )
      keyvalue.appendChild( fragment.cloneNode( true ) )

      node.appendChild( keyvalue )
    })
  } else {
    throw Error( `Unexpected each action to be "array" or "object": ${ action }` )
  }
}

module.exports = populateEach
