'use strict'

const is = require( '@mojule/is' )
const { empty } = require( '@mojule/dom-utils' )

const populateInclude = ({ node, populateAction, onInclude }) => {
  empty( node )

  const { action, value, templateName } = populateAction
  const template = value

  if( template && action === 'name' ){
    node.appendChild( template.cloneNode( true ) )
  }

  onInclude( templateName, node )
}

module.exports = populateInclude
