'use strict'

const attr = require( './attr' )
const classes = require( './classes' )
const classname = require( './classname' )
const collapse = require( './collapse' )
const dataset = require( './dataset' )
const each = require( './each' )
const _if = require( './if' )
const include = require( './include' )
const not = require( './not' )
const raw = require( './raw' )
const _switch = require( './switch' )
const tagname = require( './tagname' )
const text = require( './text' )

const populators = {
  attr, classes, classname, collapse, dataset, each, if: _if, include, not, raw,
  switch: _switch, tagname, text
}

module.exports = populators
