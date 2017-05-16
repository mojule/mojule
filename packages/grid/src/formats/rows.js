'use strict'

const is = require( '@mojule/is' )

const predicate = rows => is.array( rows ) && rows.every( is.array )

const columnHeaders = rows => rows[ 0 ]

module.exports = { predicate, columnHeaders }
