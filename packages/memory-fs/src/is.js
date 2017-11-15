'use strict'

const Is = require( '@mojule/is' )

const predicates = {
  directoryNode: subject => Is.object( subject ) && subject[ '' ] === true,
  fileNode: subject => Is.object( subject ) && !subject[ '' ]
}

const is = Is( predicates )

module.exports = is
