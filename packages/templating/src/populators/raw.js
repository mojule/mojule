'use strict'

const is = require( '@mojule/is' )

const actionHandler = {
  set: ( node, value ) => {
    node.innerHTML = value
  },
  append: ( node, value ) => {
    node.innerHTML += value
  },
  prepend: ( node, value ) => {
    node.innerHTML = value + node.innerHTML
  }
}

const populateRaw = ({ node, populateAction }) => {
  const { action, value = '' } = populateAction

  actionHandler[ action ]( node, value )
}

module.exports = populateRaw
