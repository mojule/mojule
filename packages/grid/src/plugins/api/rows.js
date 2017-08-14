'use strict'

const is = require( '@mojule/is' )

const rows = ({ api, state, Api }) => {
  api.getRows = ( startY, endY, startX, endX ) => {
    startX = api.normalizeColumnIndex( startX )
    endX = api.normalizeColumnIndex( endX )
    startY = api.normalizeRowIndex( startY )
    endY = api.normalizeRowIndex( endY )

    return Api.getRowsFrom( state.rows, startY, endY, startX, endX )
  }

  api.setRows = ( rows, y = 0, x = 0 ) => {
    x = api.normalizeColumnIndex( x )
    y = api.normalizeRowIndex( y )

    rows.forEach( ( row, i ) => {
      api.setRow( row, y + i, x  )
    })

    return rows
  }

  api.rows = ( ...args ) => {
    const head = args[ 0 ]

    if( is.array( head ) )
      return api.setRows( ...args )

    return api.getRows( ...args )
  }
}

module.exports = rows
