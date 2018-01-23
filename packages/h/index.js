'use strict'

const elementMeta = require( '@mojule/element-meta' )
const Is = require( '@mojule/is' )

const meta = elementMeta()
const tagNames = Object.keys( meta )

const predicates = {
  attributeMapValue: value => Is.string( value ) || Is.function( value ),
  attributeMap: value =>
    Is.object( value ) && Object.keys( value ).every( key =>
      predicates.attributeMapValue( value[ key ] )
    ),
  node: value =>
    value && Is.string( value.nodeName ) && Is.integer( value.nodeType )
}

const is = Is( predicates )

const handleAttributes = ( document, el, attributes ) => {
  Object.keys( attributes ).forEach( key => {
    const value = attributes[ key ]

    if( is.string( value ) ){
      el.setAttribute( key, value )
    } else if( is.function( value ) ){
      el.addEventListener( key, value )
    }
  })
}

const handleArg = ( document, el, arg ) => {
  if( is.string( arg ) ){
    const text = document.createTextNode( arg )

    el.appendChild( text )
  } else if( is.node( arg ) ){
    el.appendChild( arg )
  } else if( is.attributeMap( arg ) ) {
    handleAttributes( document, el, arg )
  }
}

const createEl = ( document, tagName, ...args ) => {
  const el = document.createElement( tagName )

  args.forEach( arg => {
    handleArg( document, el, arg )
  })

  return el
}

const H = document => {
  const element = ( tagName, ...args ) => createEl( document, tagName, ...args )
  const textNode = str => document.createTextNode( str )
  const comment = str => document.createComment( str )
  const documentFragment = ( ...childNodes ) => {
    const fragment = document.createDocumentFragment()

    childNodes.forEach( node => {
      if( is.node( node ) ){
        fragment.appendChild( node )
      } else if( is.string( node ) ){
        fragment.appendChild( document.createTextNode( node ) )
      }
    })

    return fragment
  }

  const h = {
    element, textNode, comment, documentFragment
  }

  tagNames.forEach( tagName => {
    h[ tagName ] = ( ...args ) => element( tagName, ...args )
  })

  return h
}

module.exports = H
