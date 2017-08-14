'use strict'

const is = require( '@mojule/is' )

const columns = ({ api, state, Api }) => {
  api.getColumns = ( startX, endX, startY, endY  ) => {
    startY = api.normalizeRowIndex( startY )
    endY = api.normalizeRowIndex( endY )
    startX = api.normalizeColumnIndex( startX )
    endX = api.normalizeColumnIndex( endX )

    return Api.getColumnsFrom( state.rows, startX, endX, startY, endY )
  }

  api.setColumns = ( columns, x = 0, y = 0 ) => {
    x = api.normalizeColumnIndex( x )
    y = api.normalizeRowIndex( y )

    columns.forEach( ( col, i ) => {
      api.setColumn( col, x + i, y )
    })

    return columns
  }

  api.columns = ( ...args ) => {
    const head = args[ 0 ]

    if( is.array( head ) )
      return api.setColumns( ...args )

    return api.getColumns( ...args )
  }
}

module.exports = columns
