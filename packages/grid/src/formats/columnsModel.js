'use strict'

const is = require( '@mojule/is' )
const columns = require( './columns' )

const rowsToColumns = columns.fromRows

const predicate = columnsModel =>
  is.object( columnsModel ) &&
  Object.keys( columnsModel ).every( key => is.array( columnsModel[ key ] ) )

const columnHeaders = columnsModel => Object.keys( columnsModel )

const toRows = columnsModel => {
  const headers = columnHeaders( columnsModel )

  const height = headers.reduce(
    ( max, key ) => columnsModel[ key ].length > max ? columnsModel[ key ].length : max,
    0
  )

  const rows = [ headers ]

  const getRow = y =>
    headers.reduce( ( row, key ) => {
      row.push( columnsModel[ key ][ y ] )

      return row
    }, [] )

  for( let y = 0; y < height; y++ )
    rows.push( getRow( y ) )

  return rows
}

const fromRows = ( rows, headers ) => {
  const columns = rowsToColumns( rows, headers )

  return columns.reduce( ( obj, col, x ) => {
    obj[ headers[ x ] ] = col.slice( 1 )

    return obj
  }, {} )
}

module.exports = { predicate, columnHeaders, toRows, fromRows }
