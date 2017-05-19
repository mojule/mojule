'use strict'

const statics = require( './statics' )
const normalizeIndices = require( './core/normalize-indices' )
const column = require( './core/column' )
const columns = require( './core/columns' )
const row = require( './core/row' )
const rows = require( './core/rows' )
const columnName = require( './core/columnName' )
const columnNames = require( './core/columnNames' )
const rowName = require( './core/rowName' )
const rowNames = require( './core/rowNames' )
const value = require( './core/value' )
const values = require( './core/values' )
const core = require( './core' )
const schema = require( './schema' )

module.exports = [
  statics, normalizeIndices, column, columns, row, rows, columnName,
  columnNames, rowName, rowNames, value, values, core, schema
]
