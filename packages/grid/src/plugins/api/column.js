'use strict'

const is = require( '@mojule/is' )

const column = ({ api, state, Api }) => {
  api.getColumn = ( x, startY, endY ) => {
    /*
      allow column and row names to be used, but converts them to indices for
      the underlying static function - leaves any undefined values as is, so
      that the static function's default values will be used if any arguments
      are omitted
    */
    x = api.normalizeColumnIndex( x )
    startY = api.normalizeRowIndex( startY )
    endY = api.normalizeRowIndex( endY )

    return Api.getColumnFrom( state.rows, x, startY, endY )
  }

  api.setColumn = ( col, x = 0, y = 0 ) => {
    x = api.normalizeColumnIndex( x )
    y = api.normalizeRowIndex( y )

    col.forEach( ( item, i ) => {
      api.setValue( x, y + i, item )
    })

    return col
  }

  api.column = ( ...args ) => {
    const head = args[ 0 ]

    if( is.array( head ) )
      return api.setColumn( ...args )

    return api.getColumn( ...args )
  }
}

module.exports = column
