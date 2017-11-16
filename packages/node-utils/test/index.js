'use strict'

const assert = require( 'assert' )
const utils = require( '../' )
const document = require( '@mojule/document' )
const Node = require( '@mojule/node' )
const tree = require( './fixtures/tree.json' )

const {
  walk, walkUp, walkEvery, walkDescendants, find, filter, findChild,
  findDescendants, removeAll, wrap, unwrap, serialize, deserialize, root,
  indexOf, slug, path, atPath
} = utils

const targetPredicate = node => node.value.startsWith( 'target' )

describe( 'node utils', () => {
  it( 'walk', () => {
    const expect = [
      'root', 'left', 'hello', 'right', 'world', 'target a', 'target b', 'c',
      'target c'
    ]
    const node = deserialize( Node, tree )
    const values = []

    walk( node, current => {
      values.push( current.value )
    })

    assert.deepEqual( values, expect )
  })

  it( 'walkUp', () => {
    const expect = [ 'hello', 'left', 'root' ]
    const node = deserialize( Node, tree )
    const hello = node.firstChild.firstChild
    const values = []

    walkUp( hello, current => {
      values.push( current.value )
    })

    assert.deepEqual( values, expect )
  })

  it( 'walkUp early return', () => {
    const expect = [ 'hello', 'left' ]
    const node = deserialize( Node, tree )
    const hello = node.firstChild.firstChild
    const values = []

    walkUp( hello, current => {
      values.push( current.value )

      return current.value === 'left'
    })

    assert.deepEqual( values, expect )
  })

  it( 'walkEvery', () => {
    const expect = [ 'target a', 'target b', 'target c' ]
    const node = deserialize( Node, tree )
    const result = []

    walkEvery( node, targetPredicate, node => {
      result.push( node.value )
    })

    assert.deepEqual( result, expect )
  })

  it( 'walkDescendants', () => {
    const node = deserialize( Node, tree )
    const expect = [ 'target a', 'target c' ]
    const result = []

    walkDescendants( node, targetPredicate, node => {
      result.push( node.value )
    })

    assert.deepEqual( result, expect )
  })

  it( 'find', () => {
    const node = deserialize( Node, tree )
    const expect = 'target a'
    const target = find( node, targetPredicate )

    assert.strictEqual( target.value, expect )
  })

  it( 'find child', () => {
    const node = deserialize( Node, tree )
    const hello = node.firstChild.firstChild
    const expect = find( node, current => current.value === 'target a' )

    assert.deepEqual( findChild( node, targetPredicate ), expect )
    assert.strictEqual( findChild( hello, targetPredicate ), undefined )
  })

  it( 'find descendants', () => {
    const node = deserialize( Node, tree )
    const expect = [ 'target a', 'target c' ]
    const result = findDescendants( node, targetPredicate ).map( node => node.value )

    assert.deepEqual( result, expect )
  })

  it( 'filter', () => {
    const expect = [ 'target a', 'target b', 'target c' ]
    const node = deserialize( Node, tree )
    const result = filter( node, targetPredicate ).map( node => node.value )

    assert.deepEqual( result, expect )
  })

  it( 'wrap', () => {
    const node = deserialize( Node, tree )

    const hello = node.firstChild.firstChild

    const message = Node( 'message' )

    wrap( hello, message )

    const expect = [ "root",
      [ "left", [ "message", [ "hello" ] ] ],
      [ "right", [ "world" ] ],
      [ "target a", [ "target b" ] ],
      [ "c", [ "target c" ] ]
    ]

    const serialized = serialize( node )

    assert.deepEqual( serialized, expect )
  })

  it( 'wraps root', () => {
    const node = deserialize( Node, tree )
    const newRoot = Node( 'new root' )

    wrap( node, newRoot )

    const expect = [ "new root",
      [ "root",
        [ "left", [ "hello" ] ],
        [ "right", [ "world" ] ],
        [ "target a", [ "target b" ] ],
        [ "c", [ "target c" ] ]
      ]
    ]

    const serialized = serialize( newRoot )

    assert.deepEqual( serialized, expect )
  })

  it( 'unwrap', () => {
    const node = deserialize( Node, tree )

    const hello = node.firstChild.firstChild

    const message = Node( 'message' )

    wrap( hello, message )
    unwrap( message )

    const serialized = serialize( node )

    assert.deepEqual( serialized, tree )
  })

  it( 'throws if unwrapping root', () => {
    const node = Node( 'root' )

    assert.throws( () => unwrap( node ) )
  })

  it( 'removeAll', () => {
    const node = deserialize( Node, tree )
    const children = removeAll( node )
    const result = children.map( current => serialize( current ) )
    const expect = [
      [ "left", [ "hello" ] ],
      [ "right", [ "world" ] ],
      [ "target a", [ "target b" ] ],
      [ "c", [ "target c" ] ]
    ]

    assert( !node.hasChildNodes() )
    assert.deepEqual( result, expect )
  })

  it( 'root', () => {
    const node = deserialize( Node, tree )
    const hello = node.firstChild.firstChild
    const rootNode = root( hello )

    assert.strictEqual( rootNode, node )
  })

  it( 'indexOf', () => {
    const node = deserialize( Node, tree )

    assert.strictEqual( indexOf( node ), undefined )

    const children = Array.from( node.childNodes )

    children.forEach( ( child, index ) => {
      assert.strictEqual( indexOf( child ), index )
    })
  })

  it( 'slug', () => {
    const node = deserialize( Node, tree )

    assert.strictEqual( slug( node ), '' )

    const children = Array.from( node.childNodes )

    children.forEach( ( child, index ) => {
      assert.strictEqual( slug( child ), String( index ) )
    })
  })

  it( 'slug when no index property', () => {
    const div = document.createElement( 'div' )
    const p = document.createElement( 'p' )

    div.appendChild( p )

    assert.strictEqual( slug( div ), '' )
    assert.strictEqual( slug( p ), '0' )
  })

  it( 'path', () => {
    const node = deserialize( Node, tree )

    assert.strictEqual( path( node ), '' )

    const children = Array.from( node.childNodes )

    children.forEach( ( child, index ) => {
      assert.strictEqual( path( child ), `/${ index }` )
    })
  })

  it( 'atPath', () => {
    const node = deserialize( Node, tree )

    walk( node, current => {
      const currentPath = path( current )

      assert.strictEqual( atPath( node, currentPath ), current )
    })
  })
})
