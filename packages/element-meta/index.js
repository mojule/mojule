'use strict'

const utils = require( '@mojule/utils' )
const data = require( './src/data.json' )

const { clone } = utils

const elementMeta = () => clone( data )

module.exports = elementMeta
