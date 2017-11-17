'use strict'

const path = require( '@mojule/path' )
const Components = require( '@mojule/components' )
const domUtils = require( '@mojule/dom-utils' )
const is = require( '@mojule/is' )
const MMON = require( '@mojule/mmon' )
const Node = require( '@mojule/node' )
const nodeUtils = require( '@mojule/node-utils' )
const VFSNode = require( '@mojule/vfs-node' )
const pify = require( 'pify' )

const virtualize = pify( VFSNode.virtualize )

const isTextExtension = ext => ext === '.mmon'

const { walk, deserialize } = nodeUtils
const { stringify } = domUtils
const { ReadComponents } = Components

const createHtmlFiles = ( vfs, componentApi ) => {
  vfs.filename = 'static'

  walk( vfs, current => {
    if( current.type === 'directory' ) return

    const { filename, data } = current
    const parsed = path.parse( filename )
    const { name, ext } = parsed

    if( ext !== '.mmon' ) return

    const mmon = MMON.parse( data )
    const modelTree = deserialize( Node, mmon )
    const rendered = componentApi.render( modelTree )
    const dom = rendered.node
    const htmlName = name + '.html'
    const newFile = VFSNode.createFile( htmlName, stringify( dom ) )
    const { parentNode } = current

    parentNode.appendChild( newFile )
    parentNode.removeChild( current )
  })

  return vfs
}

const Static = ( inpath, outpath, options, callback = err => { if( err ) throw err } ) => {
  const { fs } = options

  if( is.undefined( fs ) )
    throw Error( 'Expected "fs" in options' )

  const readComponents = ReadComponents( options )
  const componentsPath = path.join( inpath, './components' )
  const routesPath = path.join( inpath, './routes' )

  readComponents( componentsPath, ( err, components ) => {
    if( err ) return callback( err )

    const componentApi = Components( components, options )

    virtualize( fs, routesPath, isTextExtension )
      .then( vfs =>
        createHtmlFiles( vfs, componentApi )
      )
      .then( vfs => {
        VFSNode.actualize( fs, vfs, outpath, callback )
      })
      .catch( callback )
  })
}

module.exports = Static
