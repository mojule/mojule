'use strict'

const StringTree = require( '@mojule/string-tree' )

const parse = str => {
  str = str.replace( patterns.comments, '\n' )

  const stringTree = StringTree.deserialize( str, { retainEmpty: true } )

  return stringNodeToNode( null, stringTree )
}

const patterns = {
  comments: /(\/\*[^*]*\*+([^/*][^*]*\*+)*\/)|(?:\/\/.*\n)/g,
  tag: /^\s*\S+>\s*$/,
  scalar: /^\s*(\S+):\s+(.*)$/,
  inlineArray: /^\s*(\S+)\[]\s+(.+)$/,
  objectProperty: /^\s*(\S+){}\s*$/,
  arrayProperty: /^\s*(\S+)\[]\s*$/,
  embedProperty: /^\s*(\S+)\$\s*$/,
  arrayLiteral: /^\s*\[]\s*$/,
  objectLiteral: /^\s*{}\s*$/,
  inlineArrayLiteral: /^\s*\[]\s+(.+)$/,
  quotedString: /"([^"\\\\]*|\\\\["\\\\bfnrt\/]|\\\\u[0-9a-f]{4})*"/,
  quotedStringSplitter: /("(?:[^"\\\\]*|\\\\["\\\\bfnrt\/]|\\\\u[0-9a-f]{4})*")/
}

const createNode = name => [
  { name, model: {} }
]

const isTag = str => patterns.tag.test( str )
const isScalar = str => patterns.scalar.test( str )
const isInlineArray = str => patterns.inlineArray.test( str )
const isObjectProperty = str => patterns.objectProperty.test( str )
const isArrayProperty = str => patterns.arrayProperty.test( str )
const isEmbedProperty = str => patterns.embedProperty.test( str )
const isArrayLiteral = str => patterns.arrayLiteral.test( str )
const isObjectLiteral = str => patterns.objectLiteral.test( str )
const isInlineArrayLiteral = str => patterns.inlineArrayLiteral.test( str )

const parseValue = value => {
  try {
    value = JSON.parse( value )
  } catch( e ){}

  return value
}

const getScalar = str => {
  const matches = patterns.scalar.exec( str )
  const name = matches[ 1 ]
  const value = parseValue( matches[ 2 ] )

  return { name, value }
}

const toArray = str => {
  const segs = str.split( patterns.quotedStringSplitter )

  const tokens = segs.reduce( ( t, seg ) => {
    if( patterns.quotedString.test( seg ) ){
      t.push( seg )

      return t
    }

    seg = seg.trim()

    if( seg !== '' ){
      const subsegs = seg.split( /\s+/ )

      t.push( ...subsegs )
    }

    return t
  }, [] )

  return tokens.map( parseValue )
}

const getInlineArray = str => {
  const matches = patterns.inlineArray.exec( str )
  const name = matches[ 1 ]
  const value = toArray( matches[ 2 ] )

  return { name, value }
}

const getObjectProperty = stringNode => {
  const str = stringNode.getValue()
  const matches = patterns.objectProperty.exec( str )
  const name = matches[ 1 ]
  const value = {}

  stringNode.getChildren().forEach( stringChild => {
    addToObject( value, stringChild )
  })

  return { name, value }
}

const getArrayProperty = stringNode => {
  const str = stringNode.getValue()
  const matches = patterns.arrayProperty.exec( str )
  const name = matches[ 1 ]
  const value = []

  stringNode.getChildren().forEach( stringChild => {
    addToArray( value, stringChild )
  })

  return { name, value }
}

const getEmbedProperty = stringNode => {
  const leading = stringNode.getMeta( 'indent' ) + 2
  const str = stringNode.getValue()
  const matches = patterns.embedProperty.exec( str )
  const name = matches[ 1 ]
  let value = ''

  stringNode.walk( ( current, parent, depth ) => {
    if( current === stringNode ) return

    const indent = current.getMeta( 'indent' )
    const indentation = ' '.repeat( indent - leading )
    const str = current.getValue()

    value += `${ indentation }${ str }\n`
  })

  return { name, value }
}

const addToArray = ( arr, stringNode ) => {
  const str = stringNode.getValue()

  if( isArrayLiteral( str ) ){
    const arrLiteral = []

    stringNode.getChildren().forEach( stringChild => {
      addToArray( arrLiteral, stringChild )
    })

    arr.push( arrLiteral )
  } else if( isObjectLiteral( str ) ){
    const objLiteral = {}

    stringNode.getChildren().forEach( stringChild => {
      addToObject( objLiteral, stringChild )
    })

    arr.push( objLiteral )
  } else if( isInlineArrayLiteral( str ) ){
    const matches = patterns.inlineArrayLiteral.exec( str )
    const items = matches[ 1 ]

    arr.push( toArray( items ) )
  } else {
    arr.push( ...toArray( str ) )
  }
}

const addToObject = ( obj, stringNode ) => {
  const str = stringNode.getValue()

  let nameValue

  if( isScalar( str ) ){
    nameValue = getScalar( str )
  } else if( isInlineArray( str ) ){
    nameValue = getInlineArray( str )
  } else if( isObjectProperty( str ) ){
    nameValue = getObjectProperty( stringNode )
  } else if( isArrayProperty( str ) ){
    nameValue = getArrayProperty( stringNode )
  } else if( isEmbedProperty( str ) ) {
    nameValue = getEmbedProperty( stringNode )
  } else if( str.trim() === '' ){
    return
  } else {
    throw new Error( 'Unexpected line in cdoc: ' + str )
  }

  const { name, value } = nameValue

  obj[ name ] = value
}

const stringNodeToNode = ( parent, stringNode ) => {
  let value = stringNode.getValue()

  if( isTag( value ) ){
    value = value.replace( />/g, '' )

    const node = createNode( value )

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

module.exports = parse
