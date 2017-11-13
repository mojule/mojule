'use strict'

const predicates = require( './predicates' )
const { empty } = require( '@mojule/dom-utils' )

const populateNot = ({ node, populateAction }) => {
  const { action, value } = populateAction

  if( predicates[ action ]( value ) )
    empty( node )
}

module.exports = populateNot

