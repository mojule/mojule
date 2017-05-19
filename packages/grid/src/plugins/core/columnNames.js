'use strict'

const is = require( '@mojule/is' )
const { range } = require( '@mojule/utils' )

const columnNames = ( api, grid ) => {
  const hasColumnNames = () => !is.null( grid.columnNames )

  const getColumnNames = () => {
    if( is.null( grid.columnNames ) )
      return range( api.width() ).map( api.columnIndexToName )

    return grid.columnNames.slice()
  }

  const setColumnNames = names => {
    grid.columnNames = names

    return names
  }

  const columnNames = names => {
    if( is.undefined( names ) )
      return api.getColumnNames()

    return api.setColumnNames( names )
  }

  return { hasColumnNames, getColumnNames, setColumnNames, columnNames }
}

module.exports = columnNames
