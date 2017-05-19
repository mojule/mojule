'use strict'

const Grid = require( '../src' )
const log = require( './log' )

const data = [
  [ 'Name', 'Age', 'Member' ],
  [ 'Nik', 36, true ],
  [ 'Andy', 21, true ],
  [ 'Alex', 25, false ]
]

const grid = Grid( data, { columnNames: data[ 0 ] } )

log(
  'specify headers',
  'columnNames',  grid.columnNames(),
  'rows', grid.rows()
)
