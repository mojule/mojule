'use strict'

const is = require( '@mojule/is' )

const predicates = {
  has: value => !is.undefined( value ),
  boolean: value => is.boolean( value ),
  true: value => value === true,
  false: value => value === false,
  truthy: value => !!value,
  falsy: value => !value,
  array: value => is.array( value ),
  'array-empty': value => is.array( value ) && value.length === 0,
  object: value => is.object( value ),
  'object-empty': value => is.empty( value ),
  string: value => is.string( value ),
  'string-empty': value => is.string( value ) && value === '',
  number: value => is.number( value ),
  'number-zero': value => is.number( value ) && value === 0,
  'number-negative': value => is.number( value ) && value < 0,
  'number-integer': value => is.integer( value ),
  'null': value => is.null( value )
}

module.exports = predicates
