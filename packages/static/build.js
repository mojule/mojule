'use strict'

const fs = require( 'fs' )
const rimraf = require( 'rimraf' )
const document = require( '@mojule/document' )
const Static = require( './src' )

const start = new Date()

const options = { document, fs }

rimraf( './out', err => {
  if( err ) return console.error( err )

  Static( './data', './out', options, err => {
    if( err ) return console.error( err )

    const end = new Date()
    const ms = end - start

    console.log( `Done in ${ ms }ms` )
  })
})
