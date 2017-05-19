'use strict'

const is = require( '@mojule/is' )
const Vdom = require( '@mojule/vdom' )
const log = require( './log' )
const Grid = require( '../src' )

const { table, tr, th, td, text } = Vdom.h

const strToDom = str => Vdom.parse( str, { removeWhitespace: true } )

const renderCell = cell => text( cell )

const arrayToTable = rows => {
  const grid = Grid( rows )
  const models = arrayToModels( rows )
  const schema = modelsToSchema( models )
  const formatted = formatModels( models, schema )
  const properties = modelsToPropertyNames( models )

  const $headerRow = tr( ...properties.map( name => {
    const { type } = schema.properties[ name ]
    const $th = th( renderCell( name ) )

    if( type === 'number' )
      $th.addClass( 'table__cell--number' )

    return $th
  }))

  const $trs = formatted.map( model => {
    const $tds = properties.map( name => {
      const { type } = schema.properties[ name ]
      const value = model[ name ]
      const $td = td( renderCell( value ) )

      $td.setAttr( 'title', name )

      if( type === 'number' || type === 'integer' )
        $td.addClass( 'table__cell--number' )

      return $td
    })

    return tr( ...$tds )
  })

  const $table = table(
    { class: 'table' },
    $headerRow,
    ...$trs
  )

  return $table
}

module.exports = arrayToTable
