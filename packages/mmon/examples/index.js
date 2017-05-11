'use strict'

const fs = require( 'fs' )
const path = require( 'path' )
const pify = require( 'pify' )
const MMON = require( '../src' )

const { readFile, writeFile } = pify( fs )

const mmon = {}
const objs = {}
const examples = [ 'nodes', 'models', 'heredocs', 'objects' ]

const read = name => {
  const inpath = path.join( './examples/', name + '.mmon' )

  return readFile( inpath, 'utf8' )
  .then( data => mmon[ name ] = data )
}

const write = name => {
  const outpath = path.join( './examples/', name + '.json' )
  const json = JSON.stringify( objs[ name ], null, 2 )

  return writeFile( outpath, json, 'utf8' )
}

Promise.all( examples.map( read ) )
.then( () =>
  examples.forEach( name => objs[ name ] = MMON.parse( mmon[ name ] ) )
)
.then( () => Promise.all( examples.map( write ) ) )
.then( () => console.log( 'Examples converted' ) )
.catch( console.error )
