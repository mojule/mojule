'use strict'

const is = require( '@mojule/is' )

const unescape = str => str.replace( /~1/g, '/' ).replace( /~0/g, '~' )
const escape = str => str.replace( /~/g, '~0' ).replace( /\//g, '~1' )

const setter = ( obj, parts, value ) => {
  let target
  let hasNext

  const { length } = parts

  for( let i = 1; i < length; ) {
    target = unescape( parts[ i++ ] )
    hasNext = length > i

    if( is.undefined( obj[ target ] ) ){
      if( is.array( obj ) && target === '-' ){
        target = obj.length
      }

      // support nested objects/array when setting values
      if( hasNext ){
        if( ( parts[ i ] !== '' && parts[ i ] < Infinity ) || parts[ i ] === '-'){
          obj[ target ] = []
        } else {
          obj[ target ] = {}
        }
      }
    }

    if( !hasNext ) break

    obj = obj[ target ]
  }

  const oldValue = obj[ target ]

  if( is.undefined( value ) ){
    delete obj[ target ]
  } else {
    obj[ target ] = value
  }

  return oldValue
}

const compilePointer = pointer => {
  if( is.string( pointer ) ){
    pointer = pointer.split( '/' )

    if( pointer[ 0 ] === '' ) return pointer

    throw Error( 'Invalid JSON pointer.' )
  }

  if( is.array( pointer ) ) return pointer

  throw Error( 'Invalid JSON pointer.' )
}

const get = ( obj, pointer ) => {
  if( typeof obj !== 'object' )
    throw Error( 'Invalid input object.' )

  pointer = compilePointer( pointer )

  const { length } = pointer

  if( length === 1 ) return obj

  for( var i = 1; i < length; ){
    obj = obj[ unescape( pointer[ i++ ] ) ]

    if( length === i ) return obj
    if( typeof obj !== 'object') return undefined
  }
}

const set = ( obj, pointer, value ) => {
  if( typeof obj !== 'object' )
    throw Error( 'Invalid input object.' )

  pointer = compilePointer( pointer )

  if( pointer.length === 0 )
    throw Error( 'Invalid JSON pointer for set.' )

  return setter( obj, pointer, value )
}

const compile = pointer => {
  const compiled = compilePointer( pointer )

  return {
    get: obj => get( obj, compiled ),
    set: ( obj, value ) => set( obj, compiled, value )
  }
}

const clone = value => JSON.parse( JSON.stringify( value ) )

const isValueType = value =>
  is.string( value ) || is.number( value ) || is.boolean( value ) ||
  is.null( value )

const flatten = source => {
  try {
    source = clone( source )
  } catch( e ){
    throw Error( 'Expected JSON compatible value' )
  }

  const isFlattenable =
    ( is.object( source ) && !is.empty( source ) ) ||
    ( is.array( source ) && source.length > 0 )

  if( !isFlattenable )
    return source

  const target = {}

  const route = ( current, prefix = '' ) => {
    const isArray = is.array( current )

    const isValue =
      ( isArray && current.length === 0 ) ||
      isValueType( current ) || is.empty( current )

    if( isValue ){
      target[ prefix ] = current

      return
    }

    if( is.array( current ) ){
      current.forEach( ( value, i ) => {
        route( value, `${ prefix }/${ i }` )
      })

      return
    }

    Object.keys( current ).forEach( key => {
      route( current[ key ], `${ prefix }/${ escape( key ) }` )
    })
  }

  route( source )

  return target
}

const expand = ( source, target ) => {
  if( !is.object( source ) )
    throw Error( 'Invalid input object.' )

  const keys = Object.keys( source )

  if( keys.length === 0 ) return target || {}

  const pointers = keys.reduce( ( obj, key ) => {
    obj[ key ] = compilePointer( key )

    return obj
  }, {} )

  if( is.undefined( target ) ){
    const pointer = pointers[ keys[ 0 ] ]
    const first = pointer[ 1 ]

    target = /^\d+$/.test( first ) ? [] : {}
  }

  keys.forEach( key => set( target, pointers[ key ], source[ key ] ) )

  return target
}

const pointers = source => {
  try {
    source = clone( source )
  } catch( e ){
    throw Error( 'Expected JSON compatible value' )
  }

  const hasPaths = is.object( source ) || is.array( source )

  if( !hasPaths )
    return []

  const paths = []

  const route = ( current, prefix = '' ) => {
    paths.push( prefix || '/' )

    if( is.array( current ) ){
      current.forEach( ( value, i ) => {
        route( value, `${ prefix }/${ i }` )
      })
    } else if( is.object( current ) ){
      Object.keys( current ).forEach( key => {
        route( current[ key ], `${ prefix }/${ escape( key ) }` )
      })
    }
  }

  route( source )

  return paths
}

module.exports = { get, set, compile, flatten, expand, pointers }
