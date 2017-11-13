'use strict'

const is = require( '@mojule/is' )
const eachElementChild = require( '../each-element-child' )
const isTokenElement = require( '../is-token-element' )

const setAttributes = ( node, populateAction, set ) => {
  const { action, value = '' } = populateAction

  if( action === 'set' ){
    Object.keys( value ).forEach( key => {
      const attributeValue = value[ key ]

      set( node, key, attributeValue, 'object' )
    })
  } else {
    set( node, action, value, 'single' )
  }
}

const populateAttributes = ({ node, populateAction, set, tokens }) => {
  const tokenNames = Object.keys( tokens )

  if( isTokenElement( tokenNames, node ) ){
    eachElementChild( tokenNames, node, target => {
      setAttributes( target, populateAction, set )
    })
  } else {
    setAttributes( node, populateAction, set )
  }
}

module.exports = populateAttributes
