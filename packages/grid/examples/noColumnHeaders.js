'use strict'

const Grid = require( '../src' )

const data = [
  [ 'Nik', 36, true ],
  [ 'Andy', 21, true ],
  [ 'Alex', 25, false ]
]

const grid = Grid( data, { hasColumnHeaders: false } )

console.log( JSON.stringify( grid.columnsModel() ) )
