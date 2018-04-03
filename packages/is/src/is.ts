const isEmptyObject = ( obj ): obj is {} => {
  for( const key in obj )
    return false

  return true
}

type Fn =  ( ...args: any[] ) => any

const isNumber = ( subject: any ): subject is number =>
  typeof subject === 'number' && isFinite( subject )

const isInteger = ( subject: any ): subject is number =>
  Number.isInteger( subject )

const isString = ( subject: any ): subject is string =>
  typeof subject === 'string'

const isBoolean = ( subject: any ): subject is boolean =>
  typeof subject === 'boolean'

const isArray = ( subject: any ): subject is any[] =>
  Array.isArray( subject )

const isNull = ( subject: any ): subject is null =>
  subject === null

const isUndefined = ( subject: any ): subject is undefined =>
  subject === undefined

const isFunction = ( subject: any ): subject is Fn =>
  typeof subject === 'function'

// I think you can exclude array, null etc with Diff<T, U> in TS 2.8, look into
const isObject = ( subject: any ): subject is any =>
  typeof subject === 'object' && !isNull( subject ) && !isArray( subject )

const isEmpty = ( subject: any ): subject is {} =>
  isObject( subject ) && isEmptyObject( subject )

export const is = {
  number: isNumber,
  integer: isInteger,
  string: isString,
  boolean: isBoolean,
  array: isArray,
  null: isNull,
  undefined: isUndefined,
  function: isFunction,
  object: isObject,
  empty: isEmpty
}
