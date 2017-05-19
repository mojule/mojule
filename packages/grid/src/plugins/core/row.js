'use strict'

const is = require( '@mojule/is' )

const row = ( api, grid ) => {
  const getRow = ( y, startX, endX ) => {
    y = api.normalizeRowIndex( y )
    startX = api.normalizeColumnIndex( startX )
    endX = api.normalizeColumnIndex( endX )

    return api.getRowFrom( grid.rows, y, startX, endX )
  }

  const setRow = ( row, y = 0, x = 0 ) => {
    y = api.normalizeRowIndex( y )
    x = api.normalizeColumnIndex( x )

    row.forEach( ( item, i ) => {
      api.setValue( x + i, y, item )
    })

    return row
  }

  const row = ( ...args ) => {
    const head = args[ 0 ]

    if( is.array( head ) )
      return api.setRow( ...args )

    return api.getRow( ...args )
  }

  return {
    getRow, setRow, row
  }
}

module.exports = row
