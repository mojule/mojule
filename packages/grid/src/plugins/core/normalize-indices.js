'use strict'

const is = require( '@mojule/is' )

const normalizeIndices = ( api, grid ) => {
  const normalizeColumnIndex = value => {
    if( is.integer( value ) || is.undefined( value ) )
      return value

    let index = value

    if( is.string( value ) ){
      if( !is.null( grid.columnNames ) )
        index = grid.columnNames.indexOf( value )

      if( is.undefined( index ) )
        index = api.columnNameToIndex( value )

      if( is.undefined( index ) )
        index = parseInt( value )
    }

    if( !is.integer( index ) )
      throw new Error( 'Expected a column name or index' )

    return index
  }

  const normalizeRowIndex = value => {
    if( is.integer( value ) || is.undefined( value ) )
      return value

    let index = value

    if( is.string( index ) ){
      if( !is.null( grid.rowNames ) )
        index = grid.rowNames.indexOf( index )

      if( is.undefined( index ) )
        index = parseInt( value )
    }

    if( !is.integer( index ) )
      throw new Error( 'Expected a row name or index' )

    return index
  }

  return { normalizeColumnIndex, normalizeRowIndex }
}

module.exports = normalizeIndices
