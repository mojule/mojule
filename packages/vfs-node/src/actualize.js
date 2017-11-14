'use strict'

const nodeUtils = require( '@mojule/node-utils' )
const path = require( '@mojule/path' )
const pify = require( 'pify' )
const is = require( './is' )

const { path: getPath, filter } = nodeUtils

const actualize = ( fs, node, root, callback ) => {
  const stat = pify( fs.stat.bind( fs ) )
  const writeFile = pify( fs.writeFile.bind( fs ) )
  const mkdir = pify( fs.mkdir.bind( fs ) )

  const write = ( root, current ) => {
    const filename = path.join( root, getPath( current ) )

    if( current.type === 'directory' )
      return mkdir( filename )

    let { data, encoding } = current

    if( is.array( data ) )
      data = Buffer.from( data )

    return writeFile( filename, data, encoding )
  }

  return stat( root )
    .then( stats => {
      if( !stats.isDirectory() )
        throw new Error( 'root must be a path to an existing directory' )
    })
    .then( () => filter( node, () => true ) )
    .then( nodes => new Promise( ( resolve, reject ) => {
      const next = () => {
        if( nodes.length === 0 )
          return resolve()

        const current = nodes.shift()

        write( root, current ).then( () => next() ).catch( reject )
      }

      next()
    }))
    .then( () => callback( null ) )
    .catch( err => callback( err ) )
}

module.exports = actualize
