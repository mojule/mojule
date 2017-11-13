'use strict'

const { rename } = require( '@mojule/dom-utils' )
const eachElementChild = require( '../each-element-child' )

const populateTagname = ({ node, populateAction, document, tokens }) => {
  const tokenNames = Object.keys( tokens )
  const { action, path, value = '' } = populateAction

  if( value !== '' ){
    eachElementChild( tokenNames, node, target => {
      rename( document, target, value )
    })
  }
}

module.exports = populateTagname
