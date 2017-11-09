'use strict'

const isEmpty = obj => {
  for( const key in obj )
    return false

  return true
}

const predicates = {
  number: subject => typeof subject === 'number' && isFinite( subject ),
  integer: Number.isInteger,
  string: subject => typeof subject === 'string',
  boolean: subject => typeof subject === 'boolean',
  array: Array.isArray,
  null: subject => subject === null,
  undefined: subject => subject === undefined,
  function: subject => typeof subject === 'function',
  object: subject => typeof subject === 'object' && !predicates.null( subject ) && !predicates.array( subject ),
  empty: subject => predicates.object( subject ) && isEmpty( subject )
}

module.exports = predicates
