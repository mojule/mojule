'use strict'

const is = require( '@mojule/is' )
const chunk = require( 'lodash.chunk' )

const predicate = values => is.array( values ) && is.number( values[ 0 ] )

const columnHeaders = values => values.slice( 1, values[ 0 ] + 1 )

const toRows = values => chunk( values.slice( 1 ), values[ 0 ] )

const fromRows = ( rows, headers ) => {
  const values = [ headers.length, ...headers ]

  rows.forEach( row => values.push( ...row ) )

  return values
}

module.exports = { predicate, columnHeaders, toRows, fromRows }
