'use strict'

const api = require( './src/api' )
const Async = require( './src/async' )
const normalize = require( './src/normalize' )
const pathToArray = require( './src/path-to-array' )
const join = require( './src/join' )

const asyncNames = [
  'stat', 'readdir', 'mkdirp', 'rmdir', 'unlink', 'readlink', 'mkdir',
  'readFile', 'writeFile'
]

const defaultOptions = { api, asyncNames }

const MemoryFs = ( data = {}, options = {} ) => {
  options = Object.assign( {}, defaultOptions, options )

  const fs = { data }

  const currentAsyncNames = options.asyncNames === asyncNames ?
    asyncNames : Array.from( new Set( asyncNames.concat( options.asyncNames ) ) )

  const currentApi = options.api === api ?
    api : Object.assign( {}, api, options.api )

  Object.keys( currentApi ).forEach( name => {
    fs[ name ] = ( ...args ) => currentApi[ name ]( fs, ...args )
  })

  currentAsyncNames.forEach( name => {
    fs[ name ] = Async( fs[ name + 'Sync' ] )
  })

  return fs
}

Object.assign( MemoryFs, { normalize, pathToArray, join } )

module.exports = MemoryFs
