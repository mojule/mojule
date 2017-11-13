'use strict'

const domUtils = require( '@mojule/dom-utils' )

const { removeWhitespace } = domUtils

const collapse = ({ node }) => {
  removeWhitespace( node )
}

module.exports = collapse
