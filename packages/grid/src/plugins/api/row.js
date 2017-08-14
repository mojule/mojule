'use strict'

const is = require( '@mojule/is' )

const row = ({ api, state, Api }) => {
  api.getRow = ( y, startX, endX ) => {
    y = api.normalizeRowIndex( y )
    startX = api.normalizeColumnIndex( startX )
    endX = api.normalizeColumnIndex( endX )

    return Api.getRowFrom( state.rows, y, startX, endX )
  }

  api.setRow = ( row, y = 0, x = 0 ) => {
    y = api.normalizeRowIndex( y )
    x = api.normalizeColumnIndex( x )

    row.forEach( ( item, i ) => {
      api.setValue( x + i, y, item )
    })

    return row
  }

  api.row = ( ...args ) => {
    const head = args[ 0 ]

    if( is.array( head ) )
      return api.setRow( ...args )

    return api.getRow( ...args )
  }
}

module.exports = row
