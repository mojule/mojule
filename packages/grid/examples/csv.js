'use strict'

const Grid = require( '../src' )
const log = require( './log' )

const csv = 'Name,Age,Member\nNik,36,TRUE\nAndy,21,TRUE\nAlex,25,FALSE\n'

const grid = Grid( csv )

log(
  'csv',
  'columnNames', grid.columnNames(),
  'rows', grid.rows(),
  'round trip', grid.csv()
)
