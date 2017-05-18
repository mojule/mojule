'use strict'

const Grid = require( '../src' )

const data = [
  [ 'Name', 'Age', 'Member' ],
  [ 'Nik', 36, true ],
  [ 'Andy', 21, true ],
  [ 'Alex', 25, false ]
]

const grid = Grid( data )
const columnsModel = grid.columnsModel()
const columnsModelGrid = Grid( columnsModel )

console.log( 'columnsModel' )
console.log( JSON.stringify( columnsModel ) )
console.log( JSON.stringify( columnsModelGrid.columnNames() ) )
console.log( JSON.stringify( columnsModelGrid.rows() ) )
console.log( '---' )