'use strict'

const eachElementChild = require( '../each-element-child' )
const isTokenElement = require( '../is-token-element' )

const setClasses = ( node, populateAction, set ) => {
  const { action, value = [] } = populateAction

  set( node, action, value )
}

const populateClasses = ({ node, populateAction, set, tokens }) => {
  const tokenNames = Object.keys( tokens )

  if( isTokenElement( tokenNames, node ) ){
    eachElementChild( tokenNames, node, target => {
      setClasses( target, populateAction, set )
    })
  } else {
    setClasses( node, populateAction, set )
  }
}

module.exports = populateClasses
