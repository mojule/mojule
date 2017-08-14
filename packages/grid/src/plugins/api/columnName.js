'use strict'

const is = require( '@mojule/is' )

const columnName = ({ api, state, Api }) => {
  api.getColumnName = i => {
    if( is.null( state.columnNames ) )
      return Api.columnIndexToName( i )

    return state.columnNames[ i ]
  }

  api.setColumnName = ( i, value ) => {
    i = api.normalizeColumnIndex( i )

    if( is.undefined( i ) )
      throw Error( 'Expected first argument to be a column name or index' )

    if( !is.string( value ) )
      throw Error( 'Expected the new name to be a string' )

    if( is.null( state.columnNames ) )
      state.columnNames = Array( api.width() )

    state.columnNames[ i ] = value

    return value
  }

  api.columnName = ( i, value ) => {
    if( is.undefined( value ) )
      return api.getColumnName( i )

    return api.setColumnName( i, value )
  }
}

module.exports = columnName
