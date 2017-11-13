'use strict'

const domUtils = require( '@mojule/dom-utils' )
const is = require( '@mojule/is' )
const getPath = require( './get-path' )

const { eachAttribute } = domUtils

const TokenData = ( tokenName, action, attributeValue, path = '', attributeName = '' ) => {
  return { tokenName, action, attributeValue, path, attributeName }
}

const tagAllTokens = ( node, callback ) => {
  eachAttribute( node, attribute => {
    const { name, value } = attribute
    const path = getPath( node, name )

    callback( TokenData( node.localName, name, value, path ) )
  })
}

const tagActionToken = ( node, action, callback ) => {
  const path = getPath( node, action )
  const attributeValue = node.getAttribute( action )

  callback( TokenData( node.localName, action, attributeValue, path ) )
}

const tagDefaultToken = ( node, tokens, callback ) => {
  const tokenName = node.localName
  const token = tokens[ tokenName ]
  const { actionNames } = token
  const action = actionNames[ 0 ]
  const path = getPath( node )
  const attributeValue = node.getAttribute( action )

  callback( TokenData( tokenName, action, attributeValue, path ) )
}

const tagTokens = ( node, tokens, callback ) => {
  const tokenName = node.localName
  const token = tokens[ tokenName ]
  const { actionNames } = token

  if( node.hasAttributes() ){
    actionNames.forEach( action => {
      if( action === '*' ){
        tagAllTokens( node, callback )
      } else if( node.hasAttribute( action ) ){
        tagActionToken( node, action, callback )
      }
    })
  } else {
    tagDefaultToken( node, tokens, callback )
  }
}

const attributeTokens = ( node, tokens, callback ) => {
  const tokenNames = Object.keys( tokens )

  eachAttribute( node, attribute => {
    const { name } = attribute

    const path = getPath( node, name )

    if( name === 'path' ){
      callback( TokenData( 'context', 'path', attribute.value, path, name ) )

      return
    }

    const tokenName = tokenNames.find( tokenName =>
      name.startsWith( tokenName )
    )

    if( !tokenName ) return

    const token = tokens[ tokenName ]

    if( !token.isAttr ) return

    const { actionNames } = token

    const segs = name.split( '-' )

    // if the action name is missing, default to the first action in actionNames
    const action = segs.length === 1 ?
      actionNames[ 0 ] :
      segs.slice( 1 ).join( '-' )


    const currentAction = TokenData( tokenName, action, attribute.value, path, name )

    callback( currentAction )
  })
}

const elementTokens = ( node, tokens, callback ) => {
  if( node.nodeType !== 1 ) return

  const tokenNames = Object.keys( tokens )

  if( node.hasAttributes() ){
    attributeTokens( node, tokens, callback )
  }

  const name = node.localName

  if( name === 'tag' ){
    callback( TokenData( name, 'set', node.getAttribute( 'tagname' ), '' ) )
  } else if( tokenNames.includes( name ) ){
    tagTokens( node, tokens, callback )
  }
}

module.exports = elementTokens
