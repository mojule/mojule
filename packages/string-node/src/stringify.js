'use strict'

const nodeUtils = require( '@mojule/node-utils' )
const utils = require( './utils' )

const { walk } = nodeUtils
const { trimStart, escape } = utils

const stringify = node => {
  const depths = new Map()
  let str = ''

  depths.set( node, 0 )

  walk( node, current => {
    let depth

    if( depths.has( current ) ){
      depth = depths.get( current )
    } else {
      depth = depths.get( current.parentNode ) + 1
      depths.set( current, depth )
    }

    str += '  '.repeat( depth )
    str += trimStart( escape( current.value ) )
    str += '\n'
  })

  return str
}

module.exports = stringify
