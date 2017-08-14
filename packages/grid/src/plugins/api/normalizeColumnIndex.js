'use strict'

const is = require( '@mojule/is' )

const normalizeColumnIndex = ({ api, state, Api }) => {
  api.normalizeColumnIndex = value => {
    if( is.integer( value ) || is.undefined( value ) )
      return value

    let index

    if( is.string( value ) ) {
      if( is.null( state.columnNames ) ) {
        index = Api.columnNameToIndex( value )
      } else {
        index = state.columnNames.indexOf( value )

        if( index === -1 ) {
          index = Api.columnNameToIndex( value )
        }
      }

      if( is.undefined( index ) )
        index = parseInt( value )
    }

    if( !is.integer( index ) )
      throw new Error( 'Expected a column name or index' )

    return index
  }
}

module.exports = normalizeColumnIndex
