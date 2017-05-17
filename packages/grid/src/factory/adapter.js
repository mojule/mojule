'use strict'

const is = require( '@mojule/is' )

const defaultOptions = {
  hasColumnHeaders: true,
  hasRowHeaders: false,
  columnNames: null,
  rowNames: null
}

const getColumnHeaders = data => data[ 0 ]
const getRowHeaders = data => data.map( row => row[ 0 ] )

const $create = ( data, options ) => {
  options = Object.assign( {}, defaultOptions, options )

  const { hasColumnHeaders, hasRowHeaders } = options

  const columnHeaderRange = [ [ 0 ], [ ] ]
}

const ArrayAdapter = ( grid, state ) => {
  const columnNames = () => state[ 0 ]
  const rowNames = () => state[ 1 ]
  const rows = () => state[ 2 ]

  const adapter = { $create, columnNames, rowNames, rows }
}

module.exports = ArrayAdapter
