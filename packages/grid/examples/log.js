'use strict'

const chunk = require( 'lodash.chunk' )

const log = ( title, ...args ) => {
  console.log( title )
  console.log( '---' )

  const pairs = chunk( args, 2 )

  pairs.forEach( pair => {
    console.log( pair[ 0 ] )

    const value = JSON.stringify( pair[ 1 ], null, 2 )

    value.split( '\n' ).forEach( line => {
      console.log( '  ' + line )
    })
  })

  console.log()
}

module.exports = log
