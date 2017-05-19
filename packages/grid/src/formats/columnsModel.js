'use strict'

const is = require( '@mojule/is' )

const predicate = columnsModel =>
  is.object( columnsModel ) &&
  Object.keys( columnsModel ).every( key => is.array( columnsModel[ key ] ) )

const columnHeaders = columnsModel => Object.keys( columnsModel )

const toStateArgs = columnsModel => {
  const columnNames = columnHeaders( columnsModel )

  const height = columnNames.reduce(
    ( max, key ) => columnsModel[ key ].length > max ? columnsModel[ key ].length : max,
    0
  )

  const rows = [ columnNames ]

  const getRow = y =>
    columnNames.reduce( ( row, key ) => {
      row.push( columnsModel[ key ][ y ] )

      return row
    }, [] )

  for( let y = 0; y < height; y++ )
    rows.push( getRow( y ) )

  const options = {
    hasColumnNames: true
  }

  return { rows, options }
}

const fromGrid = api => {
  const columns = api.columns()
  const columnNames = api.columnNames()

  return columns.reduce( ( obj, col, x ) => {
    obj[ columnNames[ x ] ] = col.slice()

    return obj
  }, {} )
}

module.exports = { predicate, toStateArgs, fromGrid }
