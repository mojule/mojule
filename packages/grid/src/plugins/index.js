'use strict'

const column = require( './api/column' )
const columnName = require( './api/columnName' )
const columnNames = require( './api/columnNames' )
const columns = require( './api/columns' )
const getRowsWithHeaders = require( './api/getRowsWithHeaders' )
const normalizeColumnIndex = require( './api/normalizeColumnIndex' )
const normalizeRowIndex = require( './api/normalizeRowIndex' )
const row = require( './api/row' )
const rowName = require( './api/rowName' )
const rowNames = require( './api/rowNames' )
const rows = require( './api/rows' )
const schema = require( './api/schema' )
const size = require( './api/size' )
const value = require( './api/value' )
const values = require( './api/values' )

const core = require( './core' )
const statics = require( './statics' )

module.exports = {
  core, statics,
  api: [
    column, columnName, columnNames, columns, getRowsWithHeaders,
    normalizeColumnIndex, normalizeRowIndex, row, rowName, rowNames, rows,
    schema, size, value, values
  ]
}