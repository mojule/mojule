'use strict'

const is = require( '@mojule/is' )

const defaultOptions = {
  hasColumnHeaders: true,
  hasRowHeaders: false,
  columnNames: null,
  rowNames: null
}

const isNames = value => is.null( value ) || is.array( value )

const core = ({ core, Api }) => {
  core.createState = ( rows, options = {} ) => {
    options = Object.assign( {}, defaultOptions, options )

    const { hasColumnHeaders, hasRowHeaders, format } = options

    if( is.string( format ) ){
      const args = Api.fromFormat( format, rows, options )

      delete args.options.format

      return core.createState( args.rows, args.options )
    }

    if( !Api.isRows( rows ) ){
      const format = Api.formatFor( rows )

      if( is.undefined( format ) )
        throw new Error( 'Expected rows or a known format' )

      const args = Api.fromFormat( format, rows, options )

      return core.createState( args.rows, args.options )
    }

    let { columnNames, rowNames } = options

    const x = hasRowHeaders ? 1 : 0
    const y = hasColumnHeaders ? 1 : 0
    const endY = Api.getHeight( rows ) - 1

    if( hasColumnHeaders && is.null( columnNames ) )
      columnNames = Api.getRowFrom( rows, 0, x )

    if( hasRowHeaders && is.null( rowNames ) )
      rowNames = Api.getColumnFrom( rows, 0, y )

    rows = Api.getRowsFrom( rows, y, endY, x )

    return { rows, columnNames, rowNames }
  }

  core.isState = state =>
    is.object( state ) && Api.isRows( state.rows ) &&
    isNames( state.columnNames ) && isNames( state.rowNames )
}

module.exports = core
