'use strict'

const { is, extendDefaults } = require( '@mojule/is' )

const predicates = {
  directoryNode: subject => is.object( subject ) && subject[ '' ] === true,
  fileNode: subject => is.object( subject ) && !subject[ '' ]
}

const memoryFsIs = extendDefaults( predicates )

module.exports = memoryFsIs
