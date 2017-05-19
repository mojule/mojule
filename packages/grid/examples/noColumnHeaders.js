'use strict'

const Grid = require( '../src' )
const log = require( './log' )

const data = [
  [ 'Nik', 36, true ],
  [ 'Andy', 21, true ],
  [ 'Alex', 25, false ]
]

const grid = Grid( data, { hasColumnHeaders: false } )

log(
  'no column headers',
  'columnsModel', grid.columnsModel()
)

