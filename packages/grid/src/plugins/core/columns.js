'use strict'

const is = require( '@mojule/is' )

const columns = ( api, grid ) => {
  const getColumns = ( startX, endX, startY, endY  ) => {
    startY = api.normalizeRowIndex( startY )
    endY = api.normalizeRowIndex( endY )
    startX = api.normalizeColumnIndex( startX )
    endX = api.normalizeColumnIndex( endX )

    return api.getColumnsFrom( grid.rows, startX, endX, startY, endY )
  }

  const setColumns = ( columns, x = 0, y = 0 ) => {
    x = api.normalizeColumnIndex( x )
    y = api.normalizeRowIndex( y )

    columns.forEach( ( col, i ) => {
      api.setColumn( col, x + i, y )
    })

    return columns
  }

  const columns = ( ...args ) => {
    const head = args[ 0 ]

    if( is.array( head ) )
      return api.setColumns( ...args )

    return api.getColumns( ...args )
  }

  return {
    getColumns, setColumns, columns
  }
}

module.exports = columns
