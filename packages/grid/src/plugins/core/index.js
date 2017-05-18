'use strict'

const is = require( '@mojule/is' )
const { range } = require( '@mojule/utils' )
const chunk = require( 'lodash.chunk' )

const core = ( api, grid ) => {
  const columnNameToIndex = name => grid.columnNames.indexOf( name )
  const rowNameToIndex = name => grid.rowNames.indexOf( name )

  const width = () => api.getWidth( grid.rows )
  const height = () => api.getHeight( grid.rows )

  const normalizeColumnIndex = value => {
    if( is.integer( value ) || is.undefined( value ) )
      return value

    let index = value

    if( is.string( value ) ){
      if( !is.null( grid.columnNames ) )
        index = grid.columnNames.indexOf( value )

      if( is.undefined( index ) )
        index = api.columnNameToIndex( value )

      if( is.undefined( index ) )
        index = parseInt( value )
    }

    if( !is.integer( index ) )
      throw new Error( 'Expected a column name or index' )

    return index
  }

  const normalizeRowIndex = value => {
    if( is.integer( value ) || is.undefined( value ) )
      return value

    let index = value

    if( is.string( index ) ){
      if( !is.null( grid.rowNames ) )
        index = grid.rowNames.indexOf( index )

      if( is.undefined( index ) )
        index = parseInt( value )
    }

    if( !is.integer( index ) )
      throw new Error( 'Expected a row name or index' )

    return index
  }

  const column = ( x, startY, endY ) => {
    /*
      allow column and row names to be used, but converts them to indices for
      the underlying static function - leaves any undefined values as is, so
      that the static function's default values will be used if any arguments
      are omitted
    */
    x = normalizeColumnIndex( x )
    startY = normalizeRowIndex( startY )
    endY = normalizeRowIndex( endY )

    return api.getColumn( grid.rows, x, startY, endY )
  }

  const row = ( y, startX, endX ) => {
    y = normalizeRowIndex( y )
    startX = normalizeColumnIndex( startX )
    endX = normalizeColumnIndex( endX )

    return api.getRow( grid.rows, y, startX, endX )
  }

  const getRows = ( startX, endX, startY, endY ) => {
    startX = normalizeColumnIndex( startX )
    endX = normalizeColumnIndex( endX )
    startY = normalizeRowIndex( startY )
    endY = normalizeRowIndex( endY )

    return api.getRows( grid.rows, startX, endX, startY, endY )
  }

  const getColumns = ( startY, endY, startX, endX ) => {
    startY = normalizeRowIndex( startY )
    endY = normalizeRowIndex( endY )
    startX = normalizeColumnIndex( startX )
    endX = normalizeColumnIndex( endX )

    return api.getColumns( grid.rows, startY, endY, startX, endX )
  }

  const getColumnNames = () => {
    if( is.null( grid.columnNames ) )
      return range( api.width() ).map( api.columnIndexToName )

    return grid.columnNames.slice()
  }

  const getRowNames = () => {
    if( is.null( grid.rowNames ) )
      return range( api.height() ).map( i => i.toString() )

    return grid.rowNames.slice()
  }

  const getColumnName = i => {
    if( is.null( grid.columnNames ) )
      return api.columnIndexToName( i )

    return grid.columnNames[ i ]
  }

  const setColumnName = ( i, value ) => {
    i = normalizeColumnIndex( i )

    if( is.undefined( i ) )
      throw new Error( 'Expected first argument to be a column name or index' )

    if( !is.string( value ) )
      throw new Error( 'Expected the new name to be a string' )

    if( is.null( grid.columnNames ) ){
      grid.columnNames = range( api.width() ).map( api.columnIndexToName )
    }

    grid.columnNames[ i ] = value

    return value
  }

  const columnName = ( i, value ) => {
    if( is.undefined( value ) )
      return api.getColumnName( i )

    return api.setColumnName( i, value )
  }

  const getRowName = i => {
    if( is.null( grid.rowNames ) )
      return i.toString()

    return grid.rowNames[ i ]
  }

  const setRowName = ( i, value ) => {
    i = normalizeRowIndex( i )

    if( is.undefined( i ) )
      throw new Error( 'Expected first argument to be a row name or index' )

    if( !is.string( value ) )
      throw new Error( 'Expected the new name to be a string' )

    if( is.null( grid.rowNames ) ){
      grid.rowNames = range( api.height() ).map( i => i.toString() )
    }

    grid.rowNames[ i ] = value

    return value
  }

  const rowName = ( i, value ) => {
    if( is.undefined( value ) )
      return api.getRowName( i )

    return api.setRowName( i, value )
  }

  const getValue = ( x, y ) => {
    x = normalizeColumnIndex( x )

    const row = api.row( y )

    return row[ x ]
  }

  const setValue = ( x, y, value ) => {
    x = normalizeColumnIndex( x )

    const row = api.row( y )

    row[ x ] = value

    return value
  }

  const value = ( x, y, value ) => {
    if( is.undefined( value ) )
      return api.getValue( x, y )

    return api.setValue( x, y, value )
  }

  const getValues = () => api.rows().reduce( ( values, row ) => {
    values.push( ...row )

    return values
  }, [] )

  const setValues = ( ...values ) => {
    if( values.length === 1 && is.array( values[ 0 ] ) )
      values = values[ 0 ]

    grid.rows = chunk( values, api.width() )

    return values
  }

  const values = ( ...values ) => {
    if( values.length === 0 )
      return api.getValues()

    return api.setValues( values )
  }

  return {
    width, height, column, row,
    rows: getRows,
    columns: getColumns,
    columnNames: getColumnNames,
    rowNames: getRowNames,
    getColumnName,
    setColumnName,
    columnName,
    getRowName,
    setRowName,
    rowName,
    getValue,
    setValue,
    value,
    getValues,
    setValues,
    values
  }
}

module.exports = core
