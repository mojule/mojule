'use strict'

const Is = require( '@mojule/is' )
const isValidFilename = require( 'valid-filename' )

const isJsonBuffer = subject =>
  Is.object( subject ) && subject.type === 'Buffer' &&
  isByteArray( subject.data )

const isByte = subject => Is.integer( subject ) && subject >= 0 && subject < 256

const isByteArray = subject => Is.array( subject ) && subject.every( isByte )

const isBuffer = subject => subject instanceof Buffer

const predicates = {
  jsonBuffer: isJsonBuffer,
  buffer: isBuffer,
  filename: isValidFilename,
  byte: isByte,
  byteArray: isByteArray
}

const is = Is( predicates )

module.exports = is