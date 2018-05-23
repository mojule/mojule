import { is } from '@mojule/is'
import * as mm from 'micromatch'

export type CompiledPointer = string[]
export type Pointer = string | CompiledPointer

export type PointerMapValue = string | number | boolean | null | never[] | {}

export interface PointerMap {
  [ pointer: string ]: PointerMapValue
}

export interface PointerValue {
  pointer: string
  value: PointerMapValue
  order: number
}

export interface DiffValue extends PointerValue {
  newValue?: PointerMapValue
  newOrder?: number
  delete?: boolean
  add?: boolean
}

const unescape = str => str.replace( /~1/g, '/' ).replace( /~0/g, '~' )
const escape = str => str.replace( /~/g, '~0' ).replace( /\//g, '~1' )

const setter = ( obj, parts, value ) => {
  let target
  let hasNext

  const { length } = parts

  for ( let i = 1; i < length; ) {
    target = unescape( parts[ i++ ] )
    hasNext = length > i

    if ( is.undefined( obj[ target ] ) ) {
      if ( is.array( obj ) && target === '-' ) {
        target = obj.length
      }

      // support nested objects/array when setting values
      if ( hasNext ) {
        if (
          ( parts[ i ] !== '' && parts[ i ] < Infinity ) ||
          parts[ i ] === '-'
        ) {
          obj[ target ] = []
        } else {
          obj[ target ] = {}
        }
      }
    }

    if ( !hasNext ) break

    obj = obj[ target ]
  }

  const oldValue = obj[ target ]

  if ( is.undefined( value ) ) {
    delete obj[ target ]
  } else {
    obj[ target ] = value
  }

  return oldValue
}

const compilePointer = ( pointer: Pointer ) => {
  if ( is.string( pointer ) ) {
    pointer = pointer.split( '/' )

    if ( pointer[ 0 ] === '' ) return pointer

    throw Error( 'Invalid JSON pointer.' )
  }

  if ( is.array( pointer ) ) return pointer

  throw Error( 'Invalid JSON pointer.' )
}

export const get = ( obj, pointer: Pointer ) => {
  if ( typeof obj !== 'object' )
    throw Error( 'Invalid input object.' )

  pointer = compilePointer( pointer )

  const { length } = pointer

  if ( length === 1 ) return obj

  for ( var i = 1; i < length; ) {
    obj = obj[ unescape( pointer[ i++ ] ) ]

    if ( length === i ) return obj
    if ( typeof obj !== 'object' ) return undefined
  }
}

export const set = ( obj, pointer: Pointer, value ) => {
  if ( typeof obj !== 'object' )
    throw Error( 'Invalid input object.' )

  pointer = compilePointer( pointer )

  if ( pointer.length === 0 )
    throw Error( 'Invalid JSON pointer for set.' )

  return setter( obj, pointer, value )
}

export const compile = ( pointer: Pointer ) => {
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

export const flatten = source => {
  try {
    source = clone( source )
  } catch ( e ) {
    throw Error( 'Expected JSON compatible value' )
  }

  const isFlattenable =
    ( is.object( source ) && !is.empty( source ) ) ||
    ( is.array( source ) && source.length > 0 )

  if ( !isFlattenable )
    return source

  const target: PointerMap = {}

  const route = ( current, prefix = '' ) => {
    const isArray = is.array( current )

    const isValue =
      ( isArray && current.length === 0 ) ||
      isValueType( current ) || is.empty( current )

    if ( isValue ) {
      target[ prefix ] = current

      return
    }

    if ( is.array( current ) ) {
      current.forEach( ( value, i ) => {
        route( value, `${ prefix }/${ i }` )
      } )

      return
    }

    Object.keys( current ).forEach( key => {
      route( current[ key ], `${ prefix }/${ escape( key ) }` )
    } )
  }

  route( source )

  return target
}

export const expand = ( source: PointerMap, target? ) => {
  if ( !is.object( source ) )
    throw Error( 'Invalid input object.' )

  const keys = Object.keys( source )

  if ( keys.length === 0 ) return target || {}

  const pointers = keys.reduce( ( obj, key ) => {
    obj[ key ] = compilePointer( key )

    return obj
  }, {} )

  if ( is.undefined( target ) ) {
    const pointer = pointers[ keys[ 0 ] ]
    const first = pointer[ 1 ]

    target = /^\d+$/.test( first ) ? [] : {}
  }

  keys.forEach( key => set( target, pointers[ key ], source[ key ] ) )

  return target
}

export const pointers = source => {
  try {
    source = clone( source )
  } catch ( e ) {
    throw Error( 'Expected JSON compatible value' )
  }

  const hasPaths = is.object( source ) || is.array( source )

  if ( !hasPaths )
    return []

  const paths: string[] = []

  const route = ( current, prefix = '' ) => {
    paths.push( prefix )

    if ( is.array( current ) ) {
      current.forEach( ( value, i ) => {
        route( value, `${ prefix }/${ i }` )
      } )
    } else if ( is.object( current ) ) {
      Object.keys( current ).forEach( key => {
        route( current[ key ], `${ prefix }/${ escape( key ) }` )
      } )
    }
  }

  route( source )

  return paths
}

export const glob = ( source, patterns: string | string[], options?: mm.Options ) => {
  const paths = pointers( source )
  const matches = mm( paths, patterns, options )
  const result = matches.map( match => get( source, match ) )

  return result
}

export const pointerValueArray = ( pointerMap: PointerMap ): PointerValue[] =>
  Object.keys( pointerMap ).map(
    ( pointer, order ) => ( {
      pointer,
      value: pointerMap[ pointer ],
      order
    } )
  )

export const globPointerValues = ( pointerValues: PointerValue[], patterns: string | string[], options?: mm.Options ) => {
  const paths = pointerValues.map( pv => pv.pointer )
  const matches = mm( paths, patterns, options )

  return pointerValues.filter( pv => matches.includes( pv.pointer ) )
}

export const sortedPointerValues = ( pointerValues: PointerValue[] ) =>
  pointerValues.slice().sort( ( a, b ) => a.order - b.order )

export const pointerValueArrayToPointerMap = ( pointerValues: PointerValue[], sort = true ) => {
  if( sort ) pointerValues = sortedPointerValues( pointerValues )

  return pointerValues.reduce(
    ( map, pointerValue ) => {
      map[ pointerValue.pointer ] = pointerValue.value

      return map
    },
    <PointerMap>{}
  )
}

const valueEquals = ( a: PointerMapValue, b: PointerMapValue ) => {
  if (
    Array.isArray( a ) && a.length === 0 &&
    Array.isArray( b ) && b.length === 0
  ) return true

  if (
    typeof a === 'object' && Object.keys( <{}>a ).length === 0 &&
    typeof b === 'object' && Object.keys( <{}>b ).length === 0
  ) return true

  return a === b
}

export const diff = ( left: PointerValue[], right: PointerValue[], sort = false ) => {
  const diff: DiffValue[] = []
  const handled = {}

  if( sort ){
    left = sortedPointerValues( left )
    right = sortedPointerValues( right )
  }

  left.forEach( ( pvLeft, index ) => {
    if ( pvLeft.order !== index ) throw Error( 'diff requires pointer values to be sorted by order' )

    const indexRight = right.findIndex( pvRight =>
      pvLeft.pointer === pvRight.pointer
    )
    const pvRight = right[ indexRight ]

    const indicesMatch = indexRight === index
    const valuesMatch = pvRight && valueEquals( pvLeft.value, pvRight.value )

    if ( indicesMatch ) {
      if ( valuesMatch ) {
        // the key, index and value are the same - no change
        diff.push( pvLeft )
      } else {
        // the key and index are the same, but the value is different
        diff.push(
          Object.assign(
            {},
            pvLeft,
            { newValue: pvRight.value }
          )
        )
      }
    } else if ( valuesMatch ) {
      // the key and value are the same but it moved
      diff.push(
        Object.assign(
          {},
          pvLeft,
          { newOrder: indexRight }
        )
      )
    } else if ( pvRight ) {
      // it was moved and changed
      diff.push(
        Object.assign(
          {},
          pvLeft,
          { newValue: pvRight.value, newOrder: indexRight }
        )
      )
    } else {
      // it was deleted
      diff.push( Object.assign( {}, pvLeft, { delete: true } ) )
    }

    handled[ pvLeft.pointer ] = true
  } )

  right.forEach( ( pvRight, index ) => {
    if ( pvRight.order !== index ) throw Error( 'diff requires pointer values to be sorted by order' )
    if ( handled[ pvRight.pointer ] ) return

    diff.push( Object.assign( {}, pvRight, { add: true } ) )
  } )

  return diff
}

export const newFromDiff = ( diffs: DiffValue[] ) => {
  const pva: PointerValue[] = []

  diffs.forEach( diff => {
    if ( diff.delete ) return

    const { pointer, value, order } = diff
    const pv = { pointer, value, order }

    if ( diff.newOrder !== undefined ) {
      pv.order = diff.newOrder
    }

    if ( diff.newValue !== undefined ) {
      pv.value = diff.newValue
    }

    pva.push( pv )
  } )

  return pva
}

export const oldFromDiff = ( diffs: DiffValue[] ) => {
  const pva: PointerValue[] = []

  diffs.forEach( diff => {
    if ( diff.add ) return

    const { pointer, value, order } = diff
    const pv = { pointer, value, order }

    pva.push( pv )
  } )

  return pva
}
