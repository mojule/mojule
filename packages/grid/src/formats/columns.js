'use strict'

const is = require( '@mojule/is' )

const predicate = columns => is.array( columns ) && columns.every( is.array )

const columnHeaders = columns => columns.map( col => col[ 0 ] )

const toRows = columns => {
  const height = columns.reduce(
    ( max, col ) => col.length > max ? col.length : max,
    0
  )

  const rows = new Array( height )

  for( let y = 0; y < height; y++ )
    rows[ y ] = []

  columns.forEach( ( col, x ) => {
    col.forEach( ( value, y ) => {
      rows[ y ][ x ] = value
    })
  })

  return rows
}

const fromRows = ( rows, headers ) => {
  rows = [ headers, ...rows ]

  const width = rows.reduce(
    ( max, row ) => row.length > max ? row.length : max,
    0
  )

  const cols = new Array( width )

  for( let x = 0; x < width; x++ )
    cols[ x ] = []

  rows.forEach( ( row, y ) => {
    row.forEach( ( value, x ) => {
      cols[ x ][ y ] = value
    })
  })

  return cols
}

module.exports = { predicate, columnHeaders, toRows, fromRows }