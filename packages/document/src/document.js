'use strict'

const { JSDOM } = require( 'jsdom' )

const Document = ( html = '<!doctype html>' ) => {
  const { window } = new JSDOM( html )
  const { document } = window

  return document
}

module.exports = Document
