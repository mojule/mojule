'use strict'

const path = require( '@mojule/path' )
const Mime = require( 'mime' )
const pify = require( 'pify' )
const is = require( './is' )

const sourceSymbol = Symbol( 'source' )

const virtualize = ( VFSNode, fs, rootPath, isTextExtension, callback ) => {
  if( is.undefined( callback ) ){
    callback = isTextExtension
    isTextExtension = () => false
  }

  const { stat, readdir, readFile } = pify( fs )

  const getChildPaths = current => {
    const ls = stats => stats.isDirectory() ? readdir( current ) : []
    const toPath = filename => path.join( current, filename )
    const toPaths = files => files.map( toPath )

    return stat( current ).then( ls ).then( toPaths )
  }

  const createDirectory = source => {
    const parsed = path.parse( source )
    const { base } = parsed

    const directory = VFSNode.createDirectory( base )

    directory[ sourceSymbol ] = source

    return directory
  }

  const createNode = source => {
    const mime = Mime.getType( source )
    const parsed = path.parse( source )
    const { base, ext } = parsed

    let encoding

    if( is.text( mime ) || isTextExtension( ext ) )
      encoding = 'utf8'

    const createFile = data => {
      const file = VFSNode.createFile( base, data, encoding )

      file[ sourceSymbol ] = source

      return file
    }

    return readFile( source, encoding ).then( createFile )
  }

  const pathToNode = source =>
    stat( source )
    .then( stats =>
      stats.isDirectory() ?
        createDirectory( source ) :
        createNode( source )
    )

  const childPathsToNodes = paths => Promise.all( paths.map( pathToNode ) )

  const createRoot = rootPath => new Promise( ( resolve, reject ) => {
    const parsed = path.parse( rootPath )
    const { name } = parsed
    const root = VFSNode.createDirectory( name )
    const nodes = [ root ]

    root[ sourceSymbol ] = rootPath

    const next = () => {
      if( !nodes.length )
        return resolve( root )

      const current = nodes.pop()
      const source = current[ sourceSymbol ]

      getChildPaths( source )
      .then( childPathsToNodes )
      .then( children => {
        children.forEach( child => {
          current.appendChild( child )
          nodes.push( child )
        })

        next()
      })
      .catch( reject )
    }

    next()
  })

  stat( rootPath )
    .then( stats =>
      stats.isDirectory() ?
        createRoot( rootPath ) :
        createNode( rootPath )
    )
    .then( rootNode => callback( null, rootNode ) )
    .catch( callback )
}

module.exports = virtualize
