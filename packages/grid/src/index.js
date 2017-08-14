'use strict'

const ApiFactory = require( '@mojule/api-factory' )
const is = require( '@mojule/is' )
const defaultPlugins = require( './plugins' )
const formats = require( './formats' )
const FormatPlugins = require( './plugins/format-plugins' )

const formatPlugins = FormatPlugins( formats )

const Grid = ApiFactory( defaultPlugins, formatPlugins )

module.exports = Grid
