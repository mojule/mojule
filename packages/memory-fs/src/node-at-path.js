'use strict'

const errors = require( 'errno' )
const FsError = require( './fs-error' )
const is = require( './is' )
const pathToArray = require( './path-to-array' )

const nodeAtPath = ( data, path, strict, operation ) => {
  path = pathToArray( path )

  let current = data
  let i = 0

  for( ; i < path.length - 1; i++ ){
    if( !is.directoryNode( current[ path[ i ] ] ) ){
      if( strict )
        throw new FsError( errors.code.ENOENT, path, operation )

      return {}
    }

    current = current[ path[ i ] ]
  }

  return {
    name: path[ i ],
    parent: current,
    node: current[ path[ i ] ],
    path
  }
}

module.exports = nodeAtPath
