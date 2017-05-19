'use strict'

const Grid = require( '../src' )
const log = require( './log' )

const data = [
  [ 'Name', 'Age', 'Member' ],
  [ 'Nik', 36, true ],
  [ 'Andy', 21, true ],
  [ 'Alex', 25, false ]
]

const grid = Grid( data )
const columnsModel = grid.columnsModel()
const columnsModelGrid = Grid( columnsModel )

log(
  'columnsModel',
  'value', columnsModel,
  'columnNames', columnsModelGrid.columnNames(),
  'rows', columnsModelGrid.rows()
)
