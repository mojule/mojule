'use strict'

const Is = require( '@mojule/is' )
const isValidFilename = require( 'valid-filename' )

const mimetypesText = [
  'application/javascript', 'application/json'
]

const encodingsText = [
  'utf8', 'ascii', 'utf-8', 'binary', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le'
]

const isText = subject =>
  ( /^text\// ).test( subject ) || ( /xml$/ ).test( subject ) ||
  mimetypesText.includes( subject ) || encodingsText.includes( subject )

const isJsonBuffer = subject =>
  Is.object( subject ) && subject.type === 'Buffer' &&
  isByteArray( subject.data )

const isByte = subject => Is.integer( subject ) && subject >= 0 && subject < 256

const isByteArray = subject => Is.array( subject ) && subject.every( isByte )

const isBuffer = subject => subject instanceof Buffer

const predicates = {
  text: isText,
  jsonBuffer: isJsonBuffer,
  buffer: isBuffer,
  filename: isValidFilename,
  byte: isByte,
  byteArray: isByteArray
}

const is = Is( predicates )

module.exports = is