'use strict'

const is = require( "@mojule/is" )

const value = ({ api, state }) => {
  api.getValue = ( x, y ) => {
    x = api.normalizeColumnIndex( x )

    const row = api.row( y )

    return row[ x ]
  }

  api.setValue = ( x, y, value ) => {
    x = api.normalizeColumnIndex( x )

    state.rows[ y ][ x ] = value

    return value
  }

  api.value = ( x, y, value ) => {
    if( is.undefined( value ) )
      return api.getValue( x, y )

    return api.setValue( x, y, value )
  }
}

module.exports = value
