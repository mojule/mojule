'use strict'

const is = require( '@mojule/is' )

const formatNumbers = column => {
  const decimalLength = column.reduce( ( length, value ) => {
    const decimals = value.toString().split( '.' )[ 1 ]

    return (
      is.string( decimals ) && decimals.length > length ? decimals.length : length
    )
  }, 0 )

  return column.map( number => number.toFixed( decimalLength ) )
}

module.exports = formatNumbers
