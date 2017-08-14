'use strict'

const is = require( '@mojule/is' )
const { range } = require( '@mojule/utils' )

const rowNames = ({ api, state }) => {
  api.hasRowNames = () => !is.null( state.rowNames )

  api.getRowNames = () => {
    if( is.null( state.rowNames ) )
      return range( api.height() ).map( i => i.toString() )

    return state.rowNames.slice()
  }

  api.setRowNames = names => {
    state.rowNames = names

    return names
  }

  api.rowNames = names => {
    if( is.undefined( names ) )
      return api.getRowNames()

    return api.setRowNames( names )
  }
}

module.exports = rowNames
