'use strict'

const is = require( '@mojule/is' )

const rows = ( api, grid ) => {
  const getRows = ( startY, endY, startX, endX ) => {
    startX = api.normalizeColumnIndex( startX )
    endX = api.normalizeColumnIndex( endX )
    startY = api.normalizeRowIndex( startY )
    endY = api.normalizeRowIndex( endY )

    return api.getRowsFrom( grid.rows, startY, endY, startX, endX )
  }

  const setRows = ( rows, y = 0, x = 0 ) => {
    x = api.normalizeColumnIndex( x )
    y = api.normalizeRowIndex( y )

    rows.forEach( ( row, i ) => {
      api.setRow( y + i, x, row )
    })

    return rows
  }

  const rows = ( ...args ) => {
    const head = args[ 0 ]

    if( is.array( head ) )
      return api.setRows( ...args )

    return api.getRows( ...args )
  }

  return {
    getRows, setRows, rows
  }
}

module.exports = rows
