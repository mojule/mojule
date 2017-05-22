'use strict'

const is = require( '@mojule/is' )

const normalizeIndices = ( api, grid ) => {
  const normalizeColumnIndex = value => {
    if( is.integer( value ) || is.undefined( value ) )
      return value

    let index = undefined

    if( is.string( value ) ) {
      if( is.null( grid.columnNames ) ) {
        index = api.columnNameToIndex( value )
      }
      else {
        index = grid.columnNames.indexOf( value )
        if( index === -1 ) {
          index = api.columnNameToIndex( value )
        }
      }

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

    let index = undefined

    if( is.string( value ) ) {
      if( is.null( grid.rowNames ) ) {
        index = parseInt( value )
      }
      else {
        index = grid.rowNames.indexOf( value )
        if( index === -1 ) {
          index = parseInt( value )
        }
      }
    }

    if( !is.integer( index ) )
      throw new Error( 'Expected a row name or index' )

    return index
  }

  return { normalizeColumnIndex, normalizeRowIndex }
}

module.exports = normalizeIndices
