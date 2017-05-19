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

log(
  'models',
  'value', grid.models()
)
