'use strict'

const is = require( '@mojule/is' )
const utils = require( '@mojule/utils' )
const formats = require( './formats' )

const { capitalizeFirstLetter } = utils

const formatKeys = Object.keys( formats )
const otherFormatKeys = formatKeys.slice( 1 )

const predicates = formatKeys.reduce( ( preds, key ) => {
  const name = 'is' + capitalizeFirstLetter( key )

  preds[ name ] = formats[ key ].predicate

  return preds
}, {} )

const from = otherFormatKeys.reduce( ( fr, key ) => {
  const name = 'from' + capitalizeFirstLetter( key )
  const converter = formats[ key ].toRows

  fr[ name ] = converter

  return fr
}, {})

const { isRows } = predicates

const defaultOptions = {
  hasColumnHeaders: true,
  columnHeaders: null,
  formatName: null
}

const Grid = ( data = [], options = {} ) => {
  options = Object.assign( {}, defaultOptions, options )

  let {
    hasColumnHeaders, columnHeaders, formatName
  } = options

  if( is.array( columnHeaders ) )
    hasColumnHeaders = false

  if( !is.string( formatName ) )
    formatName = formatKeys.find(
      key => formats[ key ].predicate( data )
    )

  if( formatName !== 'rows' ){
    const format = formats[ formatName ]

    if( is.undefined( format ) )
      throw new Error( 'Unexpected input format' )

    data = format.toRows( data )
  }

  const columnKeys = []

  const width = () => data.reduce(
    ( max, row ) => row.length > max ? row.length : max,
    0
  )

  const rows = () => [ columnKeys, ...data ]
  const height = () => data.length

  if( hasColumnHeaders ){
    columnKeys.push( ...data[ 0 ] )
    data = data.slice( 1 )
  } else {
    if( Array.isArray( columnHeaders ) ){
      columnKeys.push( ...columnHeaders )
    } else {
      const arr = new Array( width() )
      const keys = arr.keys()
      columnKeys.push( ...keys )
    }
  }

  const columnIndices = () => columnKeys.reduce( ( obj, key, i ) => {
    obj[ key ] = i

    return obj
  }, {} )

  const getRow = ( y = 0 ) => data[ y ]

  const getColumn = ( x = 0 ) => {
    if( is.string( x ) )
      x = columnIndices()[ x ]

    const column = data.reduce( ( col, row ) => {
      col.push( row[ x ] )
      return col
    }, [] )

    return column
  }

  const getValue = ( column = 0, row = 0 ) => {
    if( is.string( column ) )
      column = columnIndices()[ column ]

    return data[ row ][ column ]
  }

  const to = otherFormatKeys.reduce( ( t, key ) => {
    const converter = formats[ key ].fromRows

    t[ key ] = () => converter( data, columnKeys )

    return t
  }, {})

  const grid = {
    keys: () => columnKeys,
    width, height, rows, columnIndices, getColumn, getRow, getValue
  }

  Object.assign( grid, to )

  return grid
}

const columnHeaders = ( data, formatName ) => {
  if( is.undefined( formatName ) ){
    formatName = formatKeys.find(
      key => formats[ key ].predicate( data )
    )
  }

  const format = formats[ formatName ]

  if( is.undefined( format ) )
    throw new Error( 'Could not find a matching format' )

  return format.columnHeaders( data )
}

Object.assign( Grid, predicates, from, { columnHeaders } )

module.exports = Grid
