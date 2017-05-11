'use strict'

const bench = require( 'fastbench' )
const fs = require( 'fs' )
const pify = require( 'pify' )
const MMON = require( '../src' )
const YAML = require( 'js-yaml' )
const parseJson = require( './js-parse-json' )

const { readFile } = pify( fs )

let json
let mmon
let yaml

const parseJsonNative = done => {
  JSON.parse( json )

  setImmediate( done )
}

const parseJsonJs = done => {
  parseJson( json )

  setImmediate( done )
}

const parseYaml = done => {
  YAML.safeLoad( yaml )

  setImmediate( done )
}

const parseMmon = done => {
  MMON.parse( mmon )

  setImmediate( done )
}

const run = bench([
  parseJsonNative,
  parseJsonJs,
  parseYaml,
  parseMmon
], 10 )

readFile( './test/fixtures/kitchensink.json', 'utf8' )
.then( data => {
  json = data
})
.then(
  () => readFile( './test/fixtures/kitchensink.mmon', 'utf8' )
)
.then( data => {
  mmon = data
})
.then(
  () => readFile( './test/fixtures/kitchensink.yaml', 'utf8' )
)
.then( data => {
  yaml = data
})
.then( () => run() )
