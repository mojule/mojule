'use strict'

const nodeUtils = require( '@mojule/node-utils')
const path = require( '@mojule/path' )
const Transformers = require( './transformers' )

const { find, filter } = nodeUtils

const defaultOptions = {
  Transformers
}

const TransformComponents = options => {
  options = Object.assign( {}, defaultOptions, options )

  const { Transformers } = options
  const transforms = Transformers( options )

  const transformComponents = vfs => {
    options.getStyle = name => {
      const file = find( vfs, current => {
        if( current.type === 'directory' ) return false

        const directory = current.parentNode
        const parsed = path.parse( current.filename )

        return parsed.name === 'style' && directory.filename === name
      })

      if( file )
        return file.data
    }

    const result = {}

    const files = filter( vfs, current => current.type === 'file' )
    const rootPath = nodeUtils.path( vfs )

    const getCategories = directory => {
      const directoryPath = nodeUtils.path( directory )
      const relative = path.relative( rootPath, directoryPath )
      const segs = relative.split( path.sep )

      // discard last segment, it's the component name
      segs.pop()

      return segs
    }

    files.forEach( file => {
      const directory = file.parentNode
      let name = directory.filename
      const parsed = path.parse( file.filename )
      let { ext, base, name: type } = parsed
      const categories = getCategories( directory )

      let data = file.data

      if( !result[ name ] )
        result[ name ] = { name, categories }

      if( transforms[ base ] ){
        data = transforms[ base ]( data )
      } else if( transforms[ ext ] ){
        data = transforms[ ext ]( data )
      }

      result[ name ][ type ] = data
    })

    return result
  }

  return transformComponents
}

module.exports = TransformComponents
