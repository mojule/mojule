'use strict'

const is = require( '@mojule/is' )
const utils = require( '@mojule/utils' )

const { range } = utils

const isRows = rows => is.array( rows ) && rows.every( is.array )

const assertRows = rows => {
  if( !isRows( rows ) )
    throw new Error( 'Expected rows to be an array of arrays' )
}

const width = rows =>
  rows.reduce(
    ( max, row ) => row.length > max ? row.length : max,
    0
  )

const height = rows => rows.length

const getColumn = ( rows, x = 0, startY = 0, endY = height( rows ) - 1 ) => {
  const column = []

  for( let y = startY; y <= endY; y++ ){
    const row = rows[ y ]
    column.push( row[ x ] )
  }

  return column
}

const getRow = ( rows, y = 0, startX = 0, endX = width( rows ) - 1 ) => {
  return rows[ y ].slice( startX, endX + 1 )
}

const copy = ( rows, startX = 0, startY = 0, endX = width( rows ) - 1, endY = height( rows ) - 1 ) => {
  const result = []

  for( let y = startY; y <= endY; y++ ){
    result.push( getRow( rows, y, startX, endX ) )
  }

  return result
}

const getColumns = ( rows, startX = 0, startY = 0, endX = width( rows ) - 1, endY = height( rows ) - 1 ) => {
  const columns = []

  for( let x = startX; x <= endX; x++ ){
    columns.push( getColumn( rows, x, startY, endY ) )
  }

  return columns
}

const indexToName = index => {
  let name = ''

  while( index >= 0 ){
    name = String.fromCharCode( index % 26 + 97 ) + name
    index = ~~( index / 26 ) - 1
  }

  return name
}

const nameToIndex = name => {
  const { length } = name
  let index = 0

  for( let i = 0; i < length; i++ )
    index += Math.pow( 26, length - i - 1 ) * ( name.charCodeAt( i ) - 96 )

  return index - 1
}

const defaultOptions = {
  hasColumnHeaders: true,
  hasRowHeaders: false,
  columnNames: null,
  rowNames: null
}

const toGrid = ( rows, options = {} ) => {
  assertRows( rows )

  options = Object.assign( {}, defaultOptions, options )

  const { hasColumnHeaders, hasRowHeaders } = options
  let { columnNames, rowNames } = options

  const x = hasRowHeaders ? 1 : 0
  const y = hasColumnHeaders ? 1 : 0

  if( hasColumnHeaders && is.null( columnNames ) )
    columnNames = getRow( rows, 0, x )

  if( hasRowHeaders && is.null( rowNames ) )
    rowNames = getColumn( rows, 0, y )

  rows = copy( rows, x, y )

  return { columnNames, rowNames, rows }
}

const rows = {
  width, height, getColumn, getRow, copy, getColumns, indexToName, nameToIndex,
  toGrid
}

module.exports = rows
