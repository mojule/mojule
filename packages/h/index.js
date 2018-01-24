'use strict'

const elementMeta = require( '@mojule/element-meta' )
const Is = require( '@mojule/is' )
const camelCase = require( 'lodash.camelcase' )

const meta = elementMeta()
const tagNames = Object.keys( meta )

const predicates = {
  stringMap: value => Is.object( value ) && Object.keys( value ).every( key =>
    Is.string( value[ key ] )
  ),
  attributeMapValue: value => Is.string( value ) || Is.function( value ),
  attributeMap: value =>
    Is.object( value ) && Object.keys( value ).every( key => {
      if( predicates.attributeMapValue( value[ key ] ) ) return true

      if( key === 'data' || key === 'style' ){
        return predicates.stringMap( value[ key ] )
      }

      return false
    }),
  node: value =>
    value && Is.string( value.nodeName ) && Is.integer( value.nodeType )
}

const is = Is( predicates )

const handleAttributes = ( document, el, attributes ) => {
  Object.keys( attributes ).forEach( key => {
    const value = attributes[ key ]

    if( is.function( value ) ){
      el.addEventListener( key, value )
    } else if( key === 'data' && is.stringMap( value ) ) {
      Object.assign( el.dataset, value )
    } else if( key === 'style' && is.stringMap( value ) ) {
      Object.keys( value ).forEach( name => {
        const key = camelCase( name )

        el.style[ key ] = value[ name ]
      })
    } else {
      el.setAttribute( key, value )
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
  } else {
    throw Error( 'Unexpected argument' )
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
      } else {
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
