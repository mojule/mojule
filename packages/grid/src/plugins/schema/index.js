'use strict'

const is = require( '@mojule/is' )

const typenames = [ 'string', 'integer', 'number', 'boolean', 'array', 'object' ]

const infoToSchema = info => {
  const required = []

  const properties = info.names.reduce( ( props, name ) => {
    const defined = info.values[ name ].filter(
      value => !is.undefined( value )
    )

    if( defined.length === info.count )
      required.push( name )

    const typeSet = info.values[ name ].reduce( ( set, value ) => {
      const name = typenames.find( typename => is[ typename ]( value ) )

      if( name )
        set.add( name )

      return set
    }, new Set() )

    const types = Array.from( typeSet ).sort()

    let type = 'any'

    if( types.length === 1 )
      type = types[ 0 ]

    if( types.length === 2 && types[ 0 ] === 'integer' && types[ 1 ] === 'number' )
      type = 'number'

    props[ name ] = { type }

    return props
  }, {} )

  return { properties, required }
}

const schema = api => {
  return {
    schema: () => infoToSchema({
      count: api.height(),
      names: api.columnNames(),
      values: api.columnsModel()
    })
  }
}

module.exports = schema
