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

const toStateArgs = models => {
  const columnNames = columnHeaders( models )
  const rows = [
    columnNames,
    ...models.map( model => columnNames.map( key => model[ key ] ) )
  ]

  const options = {
    hasColumnNames: true
  }

  return { rows, options }
}

const fromGrid = api => {
  const rows = api.rows()
  const columnNames = api.columnNames()

  return rows.map( row => row.reduce( ( obj, value, x ) => {
    obj[ columnNames[ x ] ] = value

    return obj
  }, {} ) )
}

module.exports = { predicate, toStateArgs, fromGrid }
