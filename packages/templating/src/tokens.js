'use strict'

const predicates = require( './populators/predicates' )
const Token = require( './token' )

const textActions = [ 'set', 'append', 'prepend' ]
const attrActions = [ 'set', '*' ]
const classActions = [ 'set', 'add', 'remove', 'toggle' ]
const eachActions = [ 'array', 'object' ]
const predicateActions = Object.keys( predicates )
const contextActions = [ 'path' ]
const keyvalueActions = [ 'path', 'key' ]
const includeActions = [ 'name' ]
const tagnameActions = [ 'set' ]
const switchActions = [ 'string' ]
const caseActions = [ 'value' ]

const textTypes = {
  set: 'string',
  append: 'string',
  prepend: 'string'
}

const attrTypes = {
  set: 'stringMap',
  '*': 'string'
}

const classnameTypes = {
  set: 'string',
  add: 'string',
  remove: 'string',
  toggle: 'string'
}

const classesTypes = {
  set: 'stringArray',
  add: 'stringArray',
  remove: 'stringArray',
  toggle: 'stringArray'
}

const eachTypes = {
  array: 'array',
  object: 'object'
}

const tagnameTypes = {
  set: 'string'
}

const switchTypes = {
  string: 'string'
}

const predicateTypes = {
  has: 'any',
  boolean: 'boolean',
  true: 'boolean',
  false: 'boolean',
  truthy: 'any',
  falsy: 'any',
  array: 'array',
  'array-empty': 'array',
  object: 'object',
  'object-empty': 'object',
  string: 'string',
  'string-empty': 'string',
  number: 'number',
  'number-zero': 'number',
  'number-negative': 'number',
  'number-integer': 'integer',
  'null': 'null'
}

const tokens = {
  raw: Token({
    actionNames: textActions,
    types: textTypes
  }),
  text: Token({
    actionNames: textActions,
    types: textTypes
  }),
  attr: Token({
    actionNames: attrActions,
    types: attrTypes
  }),
  dataset: Token({
    actionNames: attrActions,
    types: attrTypes
  }),
  classname: Token({
    actionNames: classActions,
    types: classnameTypes
  }),
  classes: Token({
    actionNames: classActions,
    types: classesTypes
  }),
  each: Token({
    actionNames: eachActions,
    expects: 'an array',
    types: eachTypes
  }),
  if: Token({
    actionNames: predicateActions,
    isStrict: false,
    types: predicateTypes
  }),
  not: Token({
    actionNames: predicateActions,
    isStrict: false
  }),
  context: Token({
    actionNames: contextActions,
    isPopulator: false
  }),
  keyvalue: Token({
    actionNames: keyvalueActions,
    isPopulator: false
  }),
  include: Token({
    actionNames: includeActions,
    expects: 'a template'
  }),
  tagname: Token({
    actionNames: tagnameActions,
    isAttr: false,
    types: tagnameTypes
  }),
  switch: Token({
    actionNames: switchActions,
    types: switchTypes
  }),
  case: Token({
    actionNames: caseActions,
    isStrict: false
  }),
  collapse: Token({
    isStrict: false
  })
}

module.exports = tokens