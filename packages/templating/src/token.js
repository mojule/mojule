'use strict'

const is = require( '@mojule/is' )

const defaultValidator = ( token, value, name, path ) => {
  const { expects, isStrict } = token

  if( !isStrict ) return

  if( !is.undefined( value ) ) return

  throw TypeError( `${ name } expected ${ expects } at ${ path }` )
}

const Token = ({ actionNames = [], expects = 'a value', validator = defaultValidator, isAttr = true, isStrict = true, isPopulator = true, types = {} }) => {
  const validate = ( value, name, path ) => validator( token, value, name, path )

  const token = {
    actionNames, expects, validate, isAttr, isStrict, isPopulator, types
  }

  return token
}

module.exports = Token
