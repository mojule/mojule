'use strict'

const is = require( "@mojule/is" )

const value = ( api, grid ) => {
  const getValue = ( x, y ) => {
    x = api.normalizeColumnIndex( x )

    const row = api.row( y )

    return row[ x ]
  }

  const setValue = ( x, y, value ) => {
    x = api.normalizeColumnIndex( x )

    const row = api.row( y )

    row[ x ] = value

    return value
  }

  const value = ( x, y, value ) => {
    if( is.undefined( value ) )
      return api.getValue( x, y )

    return api.setValue( x, y, value )
  }

  return { getValue, setValue, value }
}

module.exports = value
