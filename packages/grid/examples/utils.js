'use strict'

const utils = require( '../src/rows' )

const {
  width, height, getColumn, getRow, copy, getColumns, toGrid
} = utils

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

console.log( 'width', width( rows ) )
console.log( 'height', height( rows ) )
console.log( 'getColumn', getColumn( rows ) )
console.log( 'getRow', getRow( rows ) )
console.log( 'copy', copy( rows ) )
console.log( 'getColumns', getColumns( rows ) )

console.log( 'toGrid no headers', toGrid( rows, { hasColumnHeaders: false, hasRowHeaders: false } ) )
console.log( 'toGrid column headers', toGrid( rows, { hasColumnHeaders: true, hasRowHeaders: false } ) )
console.log( 'toGrid row headers', toGrid( rows, { hasColumnHeaders: false, hasRowHeaders: true } ) )
console.log( 'toGrid both headers', toGrid( rows, { hasColumnHeaders: true, hasRowHeaders: true } ) )