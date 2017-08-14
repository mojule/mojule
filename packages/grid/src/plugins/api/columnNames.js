'use strict'

const is = require( '@mojule/is' )
const { range } = require( '@mojule/utils' )

const columnNames = ({ api, state, Api }) => {
  api.hasColumnNames = () => !is.null( state.columnNames )

  api.getColumnNames = () => {
    if( is.null( state.columnNames ) )
      return range( api.width() ).map( Api.columnIndexToName )

    return state.columnNames.slice()
  }

  api.setColumnNames = names => {
    state.columnNames = names

    return names
  }

  api.columnNames = names => {
    if( is.undefined( names ) )
      return api.getColumnNames()

    return api.setColumnNames( names )
  }
}

module.exports = columnNames
