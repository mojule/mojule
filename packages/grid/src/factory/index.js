'use strict'

const ApiFactory = require( '@mojule/api-factory' )
const is = require( '@mojule/is' )
const defaultPlugins = require( '../plugins' )
const formats = require( '../formats' )
const FormatPlugins = require( './format-plugins' )

const defaultOptions = {
  formats,
  isState: state => is.object( state )
}

const GridFactory = ( ...plugins ) => {
  let options = {}

  if( plugins.length > 0 && is.object( plugins[ plugins.length - 1 ] ) )
    options = plugins.pop()

  options = Object.assign( {}, defaultOptions, options )

  if( plugins.length === 1 && is.array( plugins[ 0 ] ) )
    plugins = plugins[ 0 ]

  if( !plugins.every( is.function ) )
    throw new Error( 'Expected every plugin to be a function' )

  const { formats } = options

  if( is.object( formats ) )
    defaultPlugins.push( FormatPlugins( formats ) )

  plugins = defaultPlugins.concat( plugins )

  const Grid = ApiFactory( plugins, options )

  return Grid
}

module.exports = GridFactory
