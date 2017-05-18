'use strict'

const Grid = require( '../src' )

const {
  getWidth, getHeight, getColumn, getRow, getRows, getColumns, createState
} = Grid

const rows = [
  [ 'Name', 'Age', 'Member' ],
  [ 'Nik', 36, true ],
  [ 'Andy', 21, true ],
  [ 'Alex', 25, false ]
]

const rows2 = [
  [ 36, true ],
  [ 21, true ],
  [ 25, false ]
]

const rows2cols = [ 'Age', 'Member' ]
const rows2rows = [ 'Nik', 'Andy', 'Alex' ]

console.log( 'statics' )
console.log( 'getWidth', getWidth( rows ) )
console.log( 'getHeight', getHeight( rows ) )
console.log( 'getColumn', getColumn( rows ) )
console.log( 'getRow', getRow( rows ) )
console.log( 'getRows', getRows( rows ) )
console.log( 'getColumns', getColumns( rows ) )
console.log( 'createState no headers', createState( rows, { hasColumnHeaders: false, hasRowHeaders: false } ) )
console.log( 'createState column headers', createState( rows, { hasColumnHeaders: true, hasRowHeaders: false } ) )
console.log( 'createState row headers', createState( rows, { hasColumnHeaders: false, hasRowHeaders: true } ) )
console.log( 'createState both headers', createState( rows, { hasColumnHeaders: true, hasRowHeaders: true } ) )
console.log( '---' )