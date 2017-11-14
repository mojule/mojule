'use strict'

const schema = require( './src/schema.json' )
const is = require( './src/is' )
const actualize = require( './src/actualize' )
const tv4 = require( 'tv4' )
const Node = require( '@mojule/node' )
const { clone } = require( '@mojule/utils' )

const writeFile = ( value, data, encoding ) => {
  if( is.string( data ) ){
    if( is.undefined( encoding ) ){
      value.encoding = 'utf8'
    } else {
      value.encoding = encoding
    }

    value.data = data
  } else {
    value.encoding = undefined

    if( is.byteArray( data ) ) {
      value.data = data
    } else if( is.buffer( data ) ){
      value.data = data.toJSON().data
    } else if( is.jsonBuffer( data ) ){
      value.data = data.data
    } else  {
      throw Error( 'Invalid data' )
    }
  }
}

const extend = ( node, nodeValue ) => {
  const { value } = nodeValue

  Object.defineProperty( node, 'value', {
    get: () => clone( value )
  })

  Object.defineProperty( node, 'slug', {
    get: () => value.filename
  })

  Object.defineProperty( node, 'filename', {
    get: () => value.filename,
    set: filename => {
      if( !is.filename( filename ) )
        throw Error( 'Invalid filename' )

      value.filename = filename
    }
  })

  Object.defineProperty( node, 'type', {
    get: () => value.type
  })

  if( value.type === 'file' ){
    Object.defineProperty( node, 'data', {
      get: () => is.array( value.data ) ? value.data.slice() : value.data
    })

    Object.defineProperty( node, 'encoding', {
      get: () => value.encoding
    })

    node.writeFile = ( data, encoding ) => {
      writeFile( value, data, encoding )

      if( !tv4.validate( value, schema ) ) throw tv4.error
    }
  }
}

const VFSNode = value => {
  if( !tv4.validate( value, schema ) ) throw tv4.error

  const { filename } = value

  if( !is.filename( filename ) )
    throw Error( 'Invalid filename' )

  const node = Node( value, { extend } )

  return node
}

VFSNode.createFile = ( filename, data, encoding ) => {
  const type = 'file'
  const value = { filename, type, data, encoding }

  writeFile( value, data, encoding )

  return VFSNode( value )
}

VFSNode.createDirectory = filename => {
  const type = 'directory'

  return VFSNode( { filename, type, data: undefined, encoding: undefined } )
}

VFSNode.actualize = actualize

module.exports = VFSNode
