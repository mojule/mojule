'use strict'

const is = require( "@mojule/is" )
const chunk = require( 'lodash.chunk' )

const values = ({ api, state }) => {
  api.getValues = () => api.rows().reduce( ( values, row ) => {
    values.push( ...row )

    return values
  }, [] )

  api.setValues = values => {
    state.rows = chunk( values, api.width() )

    return values
  }

  api.values = values => {
    if( is.undefined( values ) )
      return api.getValues()

    return api.setValues( values )
  }
}

module.exports = values
