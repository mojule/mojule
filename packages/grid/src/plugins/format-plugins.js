'use strict'

const is = require( '@mojule/is' )

const FormatPlugins = formats => {
  const statics = ({ statics }) => {
    statics.getFormat = name => formats[ name ]

    statics.isFormat = ( name, value ) => {
      const format = statics.getFormat( name )

      if( is.undefined( format ) )
        throw new Error( 'Unexpected format ' + format )

      return format.predicate( value )
    }

    statics.formatFor = value => statics.formatNames().find(
      name => statics.getFormat( name ).predicate( value )
    )

    statics.fromFormat = ( name, value, options ) => {
      if( is.undefined( value ) ){
        value = name
        name = statics.formatFor( value )
      }

      const format = statics.getFormat( name )

      if( is.undefined( format ) )
        throw new Error( 'Unexpected format ' + format )

      return format.toStateArgs( value, options )
    }

    statics.formatNames = () => Object.keys( formats )
  }

  const api = ({ api }) => {
    Object.keys( formats ).forEach( name => {
      api[ name ] = () => formats[ name ].fromGrid( api )
    })
  }

  return { statics, api }
}

module.exports = FormatPlugins
