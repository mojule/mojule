'use strict'

const is = require( '@mojule/is' )

const isRows = rows => is.array( rows ) && rows.every( is.array )

const columnIndexToName = index => {
  let name = ''

  while( index >= 0 ){
    name = String.fromCharCode( index % 26 + 65 ) + name
    index = ~~( index / 26 ) - 1
  }

  return name
}

const columnNamePattern = /[A-Z]+/

const columnNameToIndex = name => {
  if( !columnNamePattern.test( name ) ){
    if( is.string( name ) )
      name = name.toUpperCase()

    if( !columnNamePattern.test( name ) )
      return
  }

  const { length } = name
  let index = 0

  for( let i = 0; i < length; i++ )
    index += Math.pow( 26, length - i - 1 ) * ( name.charCodeAt( i ) - 64 )

  return index - 1
}

const getWidth = rows =>
  rows.reduce(
    ( max, row ) => row.length > max ? row.length : max,
    0
  )

const getHeight = rows => rows.length

const statics = ({ statics }) => {
  statics.isRows = isRows
  statics.columnIndexToName = columnIndexToName
  statics.columnNameToIndex = columnNameToIndex
  statics.getWidth = getWidth
  statics.getHeight = getHeight

  statics.getColumnFrom = ( rows, x = 0, startY = 0, endY = statics.getHeight( rows ) - 1 ) => {
    const column = []

    for( let y = startY; y <= endY; y++ ){
      const row = rows[ y ]
      column.push( row[ x ] )
    }

    return column
  }

  statics.getColumnsFrom = ( rows, startX = 0, endX = statics.getWidth( rows ) - 1, startY = 0, endY = statics.getHeight( rows ) - 1 ) => {
    const columns = []

    for( let x = startX; x <= endX; x++ ){
      columns.push( statics.getColumnFrom( rows, x, startY, endY ) )
    }

    return columns
  }

  statics.getRowFrom = ( rows, y = 0, startX = 0, endX = statics.getWidth( rows ) - 1 ) => {
    return rows[ y ].slice( startX, endX + 1 )
  }

  statics.getRowsFrom = ( rows, startY = 0, endY = statics.getHeight( rows ) - 1, startX = 0, endX = statics.getWidth( rows ) - 1 ) => {
    const result = []

    for( let y = startY; y <= endY; y++ ){
      result.push( statics.getRowFrom( rows, y, startX, endX ) )
    }

    return result
  }
}

module.exports = statics
