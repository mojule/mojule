'use strict'

const Grid = require( '../src' )

const data = [
  [ 'Name', 'Age', 'Member' ],
  [ 'Nik', 36, true ],
  [ 'Andy', 21, true ],
  [ 'Alex', 25, false ]
]

const grid = Grid( data )

console.log( 'Grid', Object.keys( Grid ) )
console.log( 'grid', Object.keys( grid ) )
