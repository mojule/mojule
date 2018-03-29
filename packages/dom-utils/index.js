'use strict'

const { is } = require( '@mojule/is' )
const nodeUtils = require( '@mojule/node-utils' )

const { walk, removeAll } = nodeUtils

const select = ( node, selector ) => {
  if( node.nodeType === 1 && node.matches( selector ) )
    return node

  return node.querySelector( selector )
}

const selectAll = ( node, selector ) => {
  const result = []

  if( node.nodeType === 1 && node.matches( selector ) )
    result.push( node )

  const results = Array.from( node.querySelectorAll( selector ) )

  return result.concat( results )
}

const isWhitespaceNode = node =>
  node.nodeType === 3 && node.nodeValue.replace( /[\t\n\r ]/g, '' ).length === 0

const removeWhitespace = node => {
  const remove = []

  walk( node, current => {
    if( current.nodeType !== 3 ) return
    if( !isWhitespaceNode( current ) ) return

    remove.push( current )
  })

  remove.forEach( current => current.parentNode.removeChild( current ) )
}

//needs to be modified to leave whitespace alone in pre, script, textarea etc
const normalizeWhitespace = node => {
  node.normalize()

  walk( node, current => {
    if( current.nodeType !== 3 ) return

    current.nodeValue = current.nodeValue.replace( /[\t\n\r ]+/g, ' ' )
  })
}

const parse = ( document, str ) => {
  const fragment = document.createDocumentFragment()
  const temp = document.createElement( 'div' )

  temp.innerHTML = str

  if( temp.childNodes.length === 1 )
    return temp.removeChild( temp.firstChild )

  while( temp.firstChild )
    fragment.appendChild( temp.firstChild )

  return fragment
}

const parseDocument = ( document, str ) => {
  const doc = createEmptyDocument( document )
  const docType = document.implementation.createDocumentType( 'html', '', '' )

  const { documentElement } = document.implementation.createHTMLDocument( '' )
  documentElement.innerHTML = str

  doc.appendChild( docType )
  doc.appendChild( documentElement )

  return doc
}

const stringify = node => {
  if( node.nodeType === 1 ) return node.outerHTML

  if( node.nodeType === 3 ) return node.nodeValue

  if( node.nodeType === 8 ) return `<!--${ node.nodeValue }-->`

  // force HTML5 doctypes - for now
  if( node.nodeType === 10 ) return '<!doctype html>'

  return [ ...node.childNodes ].map( stringify ).join( '' )
}

const getAttributes = element => {
  const attributes = {}
  const { length } = element.attributes

  for( let i = 0; i < length; i++ ){
    const { name, value } = element.attributes[ i ]

    attributes[ name ] = value
  }

  return attributes
}

const setAttributes = ( element, attributes ) =>
  Object.keys( attributes ).forEach( name => {
    element.setAttribute( name, attributes[ name ] )
  })

const createEmptyDocument = document => {
  const doc = document.implementation.createDocument( 'http://www.w3.org/1999/xhtml', 'html' )

  removeAll( doc )

  return doc
}

const serializeChildren = node => [ ...node.childNodes ].map( serialize )

const serialize = node => {
  if( node.nodeType === 1 ){
    const tagName = node.tagName.toLowerCase()

    if( node.hasAttributes() )
      return [ tagName, getAttributes( node ), ...serializeChildren( node ) ]

    return [ tagName, ...serializeChildren( node ) ]
  }

  if( node.nodeType === 3 ) return node.nodeValue

  if( node.nodeType === 8 ) return [ node.nodeName, node.nodeValue ]

  if( node.nodeType === 10 ) return [
    '#document-type', node.name, node.publicId, node.systemId
  ]

  if( node.hasChildNodes() )
    return [ node.nodeName, ...serializeChildren( node ) ]

  throw Error( 'Unexpected node' )
}

const deserialize = ( document, value ) => {
  if( is.string( value ) )
    return document.createTextNode( value )

  if( !is.array( value ) )
    throw Error( 'Expected the serialized node to be a string or array' )

  const nodeName = value[ 0 ]

  if( !nodeName.startsWith( '#' ) ){
    const element = document.createElement( nodeName )

    for( let i = 1; i < value.length; i++ ){
      const current = value[ i ]

      if( is.object( current ) ){
        setAttributes( element, current )
      } else {
        element.appendChild( deserialize( document, current ) )
      }
    }

    return element
  }

  const args = value.slice( 1 )

  if( nodeName === '#comment' )
    return document.createComment( ...args )

  if( nodeName === '#document-type' )
    return document.implementation.createDocumentType( ...args )

  if( nodeName === '#document' ){
    const doc = createEmptyDocument( document )

    args.forEach( current =>
      doc.appendChild( deserialize( document, current ) )
    )

    return doc
  }

  if( nodeName === '#document-fragment' ){
    const fragment = document.createDocumentFragment()

    args.forEach( current =>
      fragment.appendChild( deserialize( document, current ) )
    )

    return fragment
  }

  throw Error( 'Unexpected node' )
}

const eachAttribute = ( node, callback ) => {
  const { attributes } = node
  const { length } = attributes

  for( let i = 0; i < length; i++ ){
    if( callback( attributes[ i ], i ) ) break
  }
}

const rename = ( document, node, tagName ) => {
  const tag = document.createElement( tagName )

  while( node.firstChild )
    tag.appendChild( node.firstChild )

  eachAttribute( node, attribute => {
    const { name, value } = attribute

    tag.setAttribute( name, value )
  })

  node.parentNode.insertBefore( tag, node )
  node.parentNode.removeChild( node )

  return tag
}

const empty = node => {
  const removed = []

  while( node.firstChild )
    removed.push( node.removeChild( node.firstChild ) )

  return removed
}

const domUtils = {
  select, selectAll, isWhitespaceNode, removeWhitespace, normalizeWhitespace,
  parse, parseDocument, stringify, getAttributes, setAttributes,
  createEmptyDocument, serialize, deserialize, eachAttribute, rename, empty
}

const utils = Object.assign( {}, nodeUtils, domUtils )

module.exports = utils
