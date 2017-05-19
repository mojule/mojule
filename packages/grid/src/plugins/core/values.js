'use strict'

const is = require( "@mojule/is" )
const chunk = require( 'lodash.chunk' )

const values = ( api, grid ) => {
  const getValues = () => api.rows().reduce( ( values, row ) => {
    values.push( ...row )

    return values
  }, [] )

  const setValues = values => {
    grid.rows = chunk( values, api.width() )

    return values
  }

  const values = values => {
    if( is.undefined( values ) )
      return api.getValues()

    return api.setValues( values )
  }

  return { getValues, setValues, values }
}

module.exports = values
