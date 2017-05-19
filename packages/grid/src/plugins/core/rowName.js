'use strict'

const is = require( '@mojule/is' )

const rowName = ( api, grid ) => {
  const getRowName = i => {
    if( is.null( grid.rowNames ) )
      return i.toString()

    return grid.rowNames[ i ]
  }

  const setRowName = ( i, value ) => {
    i = api.normalizeRowIndex( i )

    if( is.undefined( i ) )
      throw new Error( 'Expected first argument to be a row name or index' )

    if( !is.string( value ) )
      throw new Error( 'Expected the new name to be a string' )

    if( is.null( grid.rowNames ) ){
      grid.rowNames = new Array( api.height() )
    }

    grid.rowNames[ i ] = value

    return value
  }

  const rowName = ( i, value ) => {
    if( is.undefined( value ) )
      return api.getRowName( i )

    return api.setRowName( i, value )
  }

  return { getRowName, setRowName, rowName }
}

module.exports = rowName
