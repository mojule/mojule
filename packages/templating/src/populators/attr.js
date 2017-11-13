'use strict'

const populateAttributes = require( './populate-attributes' )

const populateAttr = ({ node, populateAction, tokens }) =>
  populateAttributes({ node, populateAction, tokens, set: ( target, key, value ) => {
    target.setAttribute( key, value )
  }})

module.exports = populateAttr
