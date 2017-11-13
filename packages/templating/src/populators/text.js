'use strict'

const is = require( '@mojule/is' )
const { empty } = require( '@mojule/dom-utils' )

const actionHandler = {
  set: ( node, textNode ) => {
    empty( node )
    node.appendChild( textNode )
  },
  append: ( node, textNode ) => {
    node.appendChild( textNode )
  },
  prepend: ( node, textNode ) => {
    node.insertBefore( textNode, node.firstChild )
  }
}

const populateText = ({ node, populateAction, document }) => {
  const { action, value = '' } = populateAction
  const textNode = document.createTextNode( value )

  actionHandler[ action ]( node, textNode )
}

module.exports = populateText
