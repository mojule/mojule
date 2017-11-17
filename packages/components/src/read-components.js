'use strict'

const is = require( '@mojule/is' )
const VFSNode = require( '@mojule/vfs-node' )
const pify = require( 'pify' )
const TransformComponents = require( './transform-components' )

const virtualize = pify( VFSNode.virtualize )

const ReadComponents = options => {
  const { fs } = options

  if( is.undefined( fs ) )
    throw Error( 'Expected "fs" in options' )

  const transformComponents = TransformComponents( options )

  const readComponents = ( filepath, callback ) =>
    virtualize( fs, filepath )
    .then( transformComponents )
    .then( result => callback( null, result ) )
    .catch( callback )

  return readComponents
}

module.exports = ReadComponents
