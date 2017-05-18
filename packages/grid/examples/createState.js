'use strict'

const Grid = require( '../src' )

const data = [
  [ 'Name', 'Age', 'Member' ],
  [ 'Nik', 36, true ],
  [ 'Andy', 21, true ],
  [ 'Alex', 25, false ]
]

const state = Grid.createState( data )

console.log( 'grid' )
console.log( JSON.stringify( state.columnNames ) )
console.log( JSON.stringify( state.rows ) )
console.log( '---' )
