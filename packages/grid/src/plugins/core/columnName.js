'use strict'

const is = require( '@mojule/is' )

const columnName = ( api, grid ) => {
  const getColumnName = i => {
    if( is.null( grid.columnNames ) )
      return api.columnIndexToName( i )

    return grid.columnNames[ i ]
  }

  const setColumnName = ( i, value ) => {
    i = api.normalizeColumnIndex( i )

    if( is.undefined( i ) )
      throw new Error( 'Expected first argument to be a column name or index' )

    if( !is.string( value ) )
      throw new Error( 'Expected the new name to be a string' )

    if( is.null( grid.columnNames ) )
      grid.columnNames = new Array( api.width() )

    grid.columnNames[ i ] = value

    return value
  }

  const columnName = ( i, value ) => {
    if( is.undefined( value ) )
      return api.getColumnName( i )

    return api.setColumnName( i, value )
  }

  return { getColumnName, setColumnName, columnName }
}

module.exports = columnName
