'use strict'

const is = require( '@mojule/is' )

const predicate = columnsModel =>
  is.object( columnsModel ) &&
  Object.keys( columnsModel ).every( key => is.array( columnsModel[ key ] ) )

const columnHeaders = columnsModel => Object.keys( columnsModel )

const toState = columnsModel => {
  const columnNames = columnHeaders( columnsModel )
  const rowNames = null

  const height = columnNames.reduce(
    ( max, key ) => columnsModel[ key ].length > max ? columnsModel[ key ].length : max,
    0
  )

  const rows = []

  const getRow = y =>
    columnNames.reduce( ( row, key ) => {
      row.push( columnsModel[ key ][ y ] )

      return row
    }, [] )

  for( let y = 0; y < height; y++ )
    rows.push( getRow( y ) )

  return { rows, columnNames, rowNames }
}

const fromGrid = api => {
  const columns = api.columns()
  const columnNames = api.columnNames()

  return columns.reduce( ( obj, col, x ) => {
    obj[ columnNames[ x ] ] = col.slice()

    return obj
  }, {} )
}

module.exports = { predicate, columnHeaders, toState, fromGrid }
