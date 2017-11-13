'use strict'

const domUtils = require( '@mojule/dom-utils' )

const { walkDescendants } = domUtils

const isCaseTag = node => node.localName === 'case'
const isCaseAttr = node => node.hasAttribute( 'case' )

const populateSwitch = ({ node, populateAction, document }) => {
  const { action, value } = populateAction

  const casePredicate = node =>
    node.nodeType === document.ELEMENT_NODE &&
    ( isCaseTag( node ) || isCaseAttr( node ) )

  const cases = []

  walkDescendants( node, casePredicate, current => {
    cases.push( current )
  })

  cases.forEach( current => {
    const compareValue = isCaseTag( current ) ?
      current.getAttribute( 'value' ) : current.getAttribute( 'case' )

    if( compareValue !== value ){
      current.parentNode.removeChild( current )
    }
  })
}

module.exports = populateSwitch
