'use strict'

const populateClasses = require( './populate-classes' )

module.exports = ({ node, populateAction, tokens }) =>
  populateClasses({ node, populateAction, tokens, set: ( target, name, value ) => {
    if( name === 'set' ){
      target.className = value
      return
    }

    target.classList[ name ]( value )
  }})
