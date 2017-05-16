'use strict'

const is = require( '@mojule/is' )

const predicate = models => is.array( models ) && models.every( is.object )

const columnHeaders = models =>
  models.reduce( ( names, model ) => {
    Object.keys( model ).forEach( name => {
      if( !names.includes( name ) )
        names.push( name )
    })

    return names
  }, [] )

const toRows = models => {
  const headers = columnHeaders( models )
  const rows = models.map( model => headers.map( key => model[ key ] ) )

  return [ headers, ...rows ]
}

const fromRows = ( rows, headers ) =>
  rows.map( row => row.reduce( ( obj, value, x ) => {
    obj[ headers[ x ] ] = value

    return obj
  }, {} ) )

module.exports = { predicate, columnHeaders, toRows, fromRows }
