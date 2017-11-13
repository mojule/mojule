'use strict'

const populateAttributes = require( './populate-attributes' )

const populateDataset = ({ node, populateAction, tokens }) =>
  populateAttributes({ node, populateAction, tokens, set: ( target, key, value, type ) => {
    if( type === 'object' )
      target.dataset[ key ] = value

    if( type === 'single' )
      target.setAttribute( 'data-' + key, value )
  }})

module.exports = populateDataset
