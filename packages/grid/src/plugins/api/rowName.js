'use strict'

const is = require( '@mojule/is' )

const rowName = ({ api, state }) => {
  api.getRowName = i => {
    if( is.null( state.rowNames ) )
      return i.toString()

    return state.rowNames[ i ]
  }

  api.setRowName = ( i, value ) => {
    i = api.normalizeRowIndex( i )

    if( is.undefined( i ) )
      throw Error( 'Expected first argument to be a row name or index' )

    if( !is.string( value ) )
      throw Error( 'Expected the new name to be a string' )

    if( is.null( state.rowNames ) )
      state.rowNames = Array( api.height() )

    state.rowNames[ i ] = value

    return value
  }

  api.rowName = ( i, value ) => {
    if( is.undefined( value ) )
      return api.getRowName( i )

    return api.setRowName( i, value )
  }
}

module.exports = rowName
