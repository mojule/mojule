'use strict'

const StringTree = require( '@mojule/string-tree' )

const parse = str => {
  str = str.replace( comments, '\n' )

  const stringTree = StringTree.deserialize( str, { retainEmpty: true } )

  return stringNodeToNode( null, stringTree )
}

const stringNodeToNode = ( parent, stringNode ) => {
  const raw = stringNode.getValue()
  const syntaxNode = tokenize( raw )

  if( syntaxNode.operator === '>' ){
    const node = createNode( syntaxNode.identifier )

    if( parent )
      parent.push( node )

    stringNode.getChildren().forEach( stringChild => {
      stringNodeToNode( node, stringChild )
    })

    return node
  }

  if( !parent ){
    const placeholder = []

    addToArray( placeholder, stringNode )

    return placeholder[ 0 ]
  }

  addToObject( parent[ 0 ].model, stringNode )
}

const createNode = name => [
  { name, model: {} }
]

const addToArray = ( arr, stringNode ) => {
  const raw = stringNode.getValue()

  if( raw.trim() === '' )
    return

  const syntaxNode = tokenize( raw )

  if( syntaxNode.operator === '[]' ){
    const nested = [ ...syntaxNode.value ]

    stringNode.getChildren().forEach( stringChild => {
      addToArray( nested, stringChild )
    })

    arr.push( nested )
  } else if( syntaxNode.operator === '{}' ){
    const obj = {}

    stringNode.getChildren().forEach( stringChild => {
      addToObject( obj, stringChild )
    })

    arr.push( obj )
  } else if( syntaxNode.operator === '$'){
    arr.push( getMultiline( stringNode ) )
  } else {
    arr.push( ...arrayValues( syntaxNode.value ) )
  }
}

const addToObject = ( obj, stringNode ) => {
  const raw = stringNode.getValue()

  if( raw.trim() === '' )
    return

  const syntaxNode = tokenize( raw )
  const { operator } = syntaxNode

  let value

  if( operator === '$' ){
    value = getMultiline( stringNode )
  } else if( operator === '{}' ){
    value = {}

    stringNode.getChildren().forEach( stringChild => {
      addToObject( value, stringChild )
    })
  } else if( operator === '[]' ) {
    value = [ ...syntaxNode.value ]

    stringNode.getChildren().forEach( stringChild => {
      addToArray( value, stringChild )
    })
  } else if( operator === ':' ){
    value = syntaxNode.value
  } else {
    throw new Error( 'Unexpected object child: ' + raw )
  }

  obj[ syntaxNode.identifier ] = value
}

const getMultiline = stringNode => {
  const leading = stringNode.getMeta( 'indent' ) + 2

  let value = ''

  stringNode.walk( ( current, parent, depth ) => {
    if( current === stringNode ) return

    const indent = current.getMeta( 'indent' )
    const indentation = ' '.repeat( indent - leading )
    const str = current.getValue()

    value += `${ indentation }${ str }\n`
  })

  return value
}

const quotedString = /("(?:(?:(?=\\)\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4}))|[^"\\\0-\x1F\x7F]+)*")/
const assignment = /(>|:|\[]|{}|\$)/
const whitespace = /(\s+)/
const literal = /.+/
const comments = /(\/\*[^*]*\*+([^/*][^*]*\*+)*\/)|(?:\/\/.*\n)/g

const or = ( ...regexen ) =>
  regexen.reduce( ( result, regex, i ) => {
    if( i !== 0 ) result += '|'
    result += regex.source
    return result
  }, '' )

const line = regex => new RegExp( '^' + regex.source + '$' )

const tokens = new RegExp(
  '(?:' + or( quotedString, assignment, whitespace ) + ')'
)

const patterns = {
  quotedString, assignment, whitespace, literal
}

const toString = values => values.reduce( ( str, current ) => {
  if( current.type === 'quotedString' ){
    str += JSON.parse( current.value )
  } else {
    str += current.value
  }

  return str
}, '' )

const trimValues = values => {
  let first = -1
  let last = values.length

  values.forEach( ( value, i ) => {
    if( value.type !== 'whitespace' ){
      if( first === -1 ){
        first = i
      }
      last = i
    }
  })

  if( first === -1 )
    return []

  return values.slice( first, last + 1 )
}

const parseValue = value => {
  try {
    value = JSON.parse( value )
  } catch( e ){}

  return value
}

const arrayValues = arr =>
  arr.reduce( ( newValue, current ) => {
    if( current.type === 'whitespace' )
      return newValue

    newValue.push( parseValue( current.value ) )

    return newValue
  }, [] )

const parameterlessOperators = [ '>', '$', '{}' ]

const tokenize = str => {
  let start = -1
  let assignment = -1
  let i = 0

  const segs =
    str.split( tokens ).reduce( ( tokenized, seg ) => {
      if( !seg ) return tokenized

      const type = Object.keys( patterns ).find(
        key => line( patterns[ key ] ).test( seg )
      )

      if( type === 'assignment' && assignment === -1 )
        assignment = i

      if( type !== 'whitespace' && start === -1 )
        start = i

      const value = seg

      tokenized.push( { type, value } )

      i++

      return tokenized
    }, [] )

  const type = assignment === -1 ? 'data' : 'assignment'

  const node = { type }

  if( type === 'assignment' ){
    let value = segs.slice( assignment + 1 )

    node.operator = segs[ assignment ].value
    node.identifier = toString( segs.slice( start, assignment ) )

    if( node.operator === ':' ){
      value = trimValues( value )

      if( value.length === 1 ){
        node.value = parseValue( value[ 0 ].value )
      } else {
        node.value = toString( value )
      }
    } else if( node.operator === '[]' ){
      node.value = arrayValues( value )
    } else if( !parameterlessOperators.includes( node.operator ) ) {
      node.value = value
    }
  } else {
    node.value = segs
  }

  return node
}

module.exports = parse
