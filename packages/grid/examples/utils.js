'use strict'

const Grid = require( '../src' )
const log = require( './log' )

const {
  getWidth, getHeight, getColumnFrom, getRowFrom, getRowsFrom, getColumnsFrom,
  createState
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

log(
  'statics',
  'getWidth', getWidth( rows ),
  'getHeight', getHeight( rows ),
  'getColumnFrom', getColumnFrom( rows ),
  'getRowFrom', getRowFrom( rows ),
  'getRowsFrom', getRowsFrom( rows ),
  'getColumnsFrom', getColumnsFrom( rows ),
  'createState no headers', createState( rows, { hasColumnHeaders: false, hasRowHeaders: false } ),
  'createState column headers', createState( rows, { hasColumnHeaders: true, hasRowHeaders: false } ),
  'createState row headers', createState( rows, { hasColumnHeaders: false, hasRowHeaders: true } ),
  'createState both headers', createState( rows, { hasColumnHeaders: true, hasRowHeaders: true } )
)
