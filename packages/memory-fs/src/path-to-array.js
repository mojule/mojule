'use strict'

const errors = require( 'errno' )
const normalize = require( './normalize' )
const FsError = require( './fs-error' )

const pathToArray = path => {
  path = normalize( path )

  const isPosix = /^\//.test( path )

  if( isPosix ){
    path = path.replace( /\/+/g, '/' ) // multi slashs
    path = path.substr( 1 ).split( '/' )
  } else {
    if( !/^[A-Za-z]:/.test( path ) )
      throw new FsError( errors.code.EINVAL, path )

    path = path.replace( /[\\\/]+/g, '\\' ) // multi slashs
    path = path.split( /[\\\/]/ )
    path[ 0 ] = path[ 0 ].toUpperCase()
  }

  if( !path[ path.length - 1 ] ) path.pop()

  return path
}

module.exports = pathToArray
