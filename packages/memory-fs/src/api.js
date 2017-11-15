'use strict'

const errors = require( 'errno' )
const stream = require( 'readable-stream' )
const FsError = require( './fs-error' )
const is = require( './is' )
const nodeAtPath = require( './node-at-path' )
const pathToArray = require( './path-to-array' )

const { Readable, Writable } = stream

const True = () => true
const False = () => false

const existsSync = ( fs, path ) => !!nodeAtPath( fs.data, path ).node

const statSync = ( fs, path ) => {
  const current = nodeAtPath( fs.data, path )
  const { node } = current

  if( path === '/' || is.directoryNode( node ) ){
    return {
      isFile: False,
      isDirectory: True,
      isBlockDevice: False,
      isCharacterDevice: False,
      isSymbolicLink: False,
      isFIFO: False,
      isSocket: False
    }
  } else if( is.fileNode( node ) ){
    return {
      isFile: True,
      isDirectory: False,
      isBlockDevice: False,
      isCharacterDevice: False,
      isSymbolicLink: False,
      isFIFO: False,
      isSocket: False
    }
  }

  throw new FsError( errors.code.ENOENT, path, 'stat' )
}

const readFileSync = ( fs, path, optionsOrEncoding ) => {
  const operation = 'readFile'
  const current = nodeAtPath( fs.data, path, true, operation )
  const { node } = current

  if( !is.fileNode( node ) ){
    if( is.directoryNode( node ) )
      throw new FsError( errors.code.EISDIR, path, operation )
    else
      throw new FsError( errors.code.ENOENT, path, operation )
  }

  const encoding = is.object( optionsOrEncoding ) ?
    optionsOrEncoding.encoding : optionsOrEncoding

  return encoding ? node.toString( encoding ) : node
}

const readdirSync = ( fs, path ) => {
  if( path === '/' ) return Object.keys( fs.data ).filter( Boolean )

  const operation = 'readdir'
  const current = nodeAtPath( fs.data, path, true, operation )
  const { node } = current

  if( !is.directoryNode( node ) ){
    if( is.fileNode( node ) )
      throw new FsError( errors.code.ENOTDIR, path, operation )
    else
      throw new FsError( errors.code.ENOENT, path, operation )
  }

  return Object.keys( node ).filter( Boolean )
}

const mkdirpSync = ( fs, path ) => {
  path = pathToArray( path )

  const operation = 'mkdirp'

  if( path.length === 0 ) return

  let current = fs.data

  for( let i = 0; i < path.length; i++ ){
    if( is.fileNode( current[ path[ i ] ] ) )
      throw new FsError( errors.code.ENOTDIR, path, operation )
    else if( !is.directoryNode( current[ path[ i ] ] ) )
      current[ path[ i ] ] = { '': true }

    current = current[ path[ i ] ]
  }
}

const mkdirSync = ( fs, path ) => {
  const operation = 'mkdir'
  const current = nodeAtPath( fs.data, path, true, operation )

  if( current.path.length === 0 ) return

  const { name, parent, node } = current

  if( is.directoryNode( node ) )
    throw new FsError( errors.code.EEXIST, path, operation )
  else if( is.fileNode( node ) )
    throw new FsError( errors.code.ENOTDIR, path, operation )

  parent[ name ] = { '': true }
}

const remove = ( fs, path, operation, predicate ) => {
  const current = nodeAtPath( fs.data, path, true, operation )

  if( current.path.length === 0 )
    throw new FsError( errors.code.EPERM, path, operation )

  const { name, parent, node } = current

  if( !predicate( node ) )
    throw new FsError( errors.code.ENOENT, path, operation )

  delete parent[ name ]
}

const rmdirSync = ( fs, path ) => remove( fs, path, 'rmdir', is.directoryNode )

const unlinkSync = ( fs, path ) => remove( fs, path, 'unlink', is.fileNode )

const readlinkSync = ( fs, path ) => {
  throw new FsError( errors.code.ENOSYS, path, 'readlink' )
}

const writeFileSync = ( fs, path, content, optionsOrEncoding ) => {
  if( is.undefined( content ) && !optionsOrEncoding ) throw Error( 'No content' )

  const operation = 'writeFile'
  const current = nodeAtPath( fs.data, path, true, operation )

  if( current.path.length === 0 )
    throw new FsError( errors.code.EISDIR, path, operation )

  const { name, parent, node } = current

  if( is.directoryNode( node ) )
    throw new FsError( errors.code.EISDIR, path, operation )

  const encoding = is.object( optionsOrEncoding ) ?
    optionsOrEncoding.encoding : optionsOrEncoding

  parent[ name ] = optionsOrEncoding || is.string( content ) ?
    new Buffer( content, encoding ) : content
}

// stream methods
const createReadStream = ( fs, path, options ) => {
  const stream = new Readable()
  let done = false
  let data

  try {
    data = fs.readFileSync( path )
  } catch( e ){
    stream._read = function(){
      if( done ) return

      done = true

      this.emit( 'error', e )
      this.push( null )
    }

    return stream
  }

  options = options || {}
  options.start = options.start || 0
  options.end = options.end || data.length

  stream._read = function() {
    if( done ) return

    done = true

    this.push( data.slice( options.start, options.end ) )
    this.push( null )
  }

  return stream
}

const createWriteStream = ( fs, path ) => {
  const stream = new Writable()

  try {
    // Zero the file and make sure it is writable
    fs.writeFileSync( path, new Buffer( 0 ) )
  } catch(e) {
    // This or setImmediate?
    stream.once( 'prefinish', () => stream.emit( 'error', e ) )

    return stream
  }

  const list = []
  let totalLength = 0

  stream._write = ( chunk, encoding, callback ) => {
    list.push( chunk )
    totalLength += chunk.length

    fs.writeFile( path, Buffer.concat( list, totalLength ), callback )
  }

  return stream
}

const exists = ( fs, path, callback ) => callback( fs.existsSync( path ) )

const api = {
  existsSync, statSync, readFileSync, readdirSync, mkdirpSync, mkdirSync,
  rmdirSync, unlinkSync, readlinkSync, writeFileSync, createReadStream,
  createWriteStream, exists
}

module.exports = api
