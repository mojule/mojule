'use strict'

const is = require( '@mojule/is' )
const { range } = require( '@mojule/utils' )

const rowNames = ( api, grid ) => {
  const hasRowNames = () => !is.null( grid.rowNames )

  const getRowNames = () => {
    if( is.null( grid.rowNames ) )
      return range( api.height() ).map( i => i.toString() )

    return grid.rowNames.slice()
  }

  const setRowNames = names => {
    grid.rowNames = names

    return names
  }

  const rowNames = names => {
    if( is.undefined( names ) )
      return api.getRowNames()

    return api.setRowNames( names )
  }

  return { hasRowNames, getRowNames, setRowNames, rowNames }
}

module.exports = rowNames
