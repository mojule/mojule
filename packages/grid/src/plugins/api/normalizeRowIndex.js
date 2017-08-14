'use strict'

const is = require( '@mojule/is' )

const normalizeRowIndex = ({ api, state }) => {
  api.normalizeRowIndex = value => {
    if( is.integer( value ) || is.undefined( value ) )
      return value

    let index

    if( is.string( value ) ) {
      if( is.null( state.rowNames ) ) {
        index = parseInt( value )
      }
      else {
        index = state.rowNames.indexOf( value )
        if( index === -1 ) {
          index = parseInt( value )
        }
      }
    }

    if( !is.integer( index ) )
      throw new Error( 'Expected a row name or index' )

    return index
  }
}

module.exports = normalizeRowIndex
