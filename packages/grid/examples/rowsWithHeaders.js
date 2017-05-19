'use strict'

const Grid = require( '../src' )
const log = require( './log' )

const columnHeaders = [
  [ 'Name', 'Age', 'Member' ],
  [ 'Nik', 36, true ],
  [ 'Andy', 21, true ],
  [ 'Alex', 25, false ]
]

const rowHeaders = [
  [ 'Nik', 36, true ],
  [ 'Andy', 21, true ],
  [ 'Alex', 25, false ]
]

const neither = [
  [ 36, true ],
  [ 21, true ],
  [ 25, false ]
]

const columnHeadersGrid = Grid( columnHeaders )
const rowHeadersGrid = Grid( rowHeaders, { hasColumnHeaders: false , hasRowHeaders: true } )
const neitherGrid = Grid( neither, { hasColumnHeaders: false } )
const bothGrid = Grid( columnHeaders, { hasRowHeaders: true } )

log(
  'rowsWithHeaders',
  'with column headers', columnHeadersGrid.getRowsWithHeaders(),
  'with row headers', rowHeadersGrid.getRowsWithHeaders(),
  'with neither', neitherGrid.getRowsWithHeaders(),
  'with both', bothGrid.getRowsWithHeaders()
)
