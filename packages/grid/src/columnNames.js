'use strict'

const indexToName = index => {
  let name = ''

  while( index >= 0 ){
    name = String.fromCharCode( index % 26 + 97 ) + name
    index = ~~( index / 26 ) - 1
  }

  return name
}

const nameToIndex = name => {
  const { length } = name
  let index = 0

  for( let i = 0; i < length; i++ )
    index += Math.pow( 26, length - i - 1 ) * ( name.charCodeAt( i ) - 96 )

  return index - 1
}

module.exports = { indexToName, nameToIndex }
