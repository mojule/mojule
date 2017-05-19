'use strict'

const is = require( '@mojule/is' )
const parse = require( 'csv-parse/lib/sync' )
const stringify = require( 'csv-stringify/lib/sync' )

const predicate = csv => is.string( csv )

const toStateArgs = ( csv, options ) => {
  let rows = parse( csv, { auto_parse: true } )

  // csv parse does not handle booleans :/
  rows = rows.map( row => row.map( value => {
    if( !is.string( value ) ) return value

    const s = value.toLowerCase()

    if( s === 'true' ) return true
    if( s === 'false' ) return false

    return value
  }))

  return { rows, options }
}

const fromGrid = api => {
  const rows = api.getRowsWithHeaders()

  return stringify( rows, {
    formatters: {
      bool: val => val.toString().toUpperCase()
    }
  })
}

module.exports = { predicate, toStateArgs, fromGrid }
