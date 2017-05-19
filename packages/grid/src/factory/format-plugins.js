'use strict'

const is = require( '@mojule/is' )

const FormatPlugins = formats => {
  const plugins = ( api, grid ) => {
    const $getFormat = name => formats[ name ]

    const $isFormat = ( name, value ) => {
      const format = api.getFormat( name )

      if( is.undefined( format ) )
        throw new Error( 'Unexpected format ' + format )

      return format.predicate( value )
    }

    const $formatFor = value => api.formatNames().find(
      name => api.getFormat( name ).predicate( value )
    )

    const $fromFormat = ( name, value, options ) => {
      if( is.undefined( value ) ){
        value = name
        name = api.formatFor( value )
      }

      const format = api.getFormat( name )

      if( is.undefined( format ) )
        throw new Error( 'Unexpected format ' + format )

      return format.toStateArgs( value, options )
    }

    const $formatNames = () => Object.keys( formats )

    const converters = Object.keys( formats ).reduce( ( to, name ) => {
      to[ name ] = () => formats[ name ].fromGrid( api )

      return to
    }, {} )

    const fns = {
      $getFormat, $isFormat, $formatFor, $fromFormat, $formatNames
    }

    Object.assign( fns, converters )

    return fns
  }

  return plugins
}

module.exports = FormatPlugins
