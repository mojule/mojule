'use strict'

const assert = require( 'assert' )
const utils = require( '../' )
const Node = require( '@mojule/node' )
const tree = require( './fixtures/tree.json' )

const {
  walk, walkUp, walkEvery, walkDescendants, find, filter, findDescendants,
  removeAll, wrap, unwrap, serialize, deserialize
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

    assert( !node.hasChildren() )
    assert.deepEqual( result, expect )
  })

  // describe( 'traversal', () => {
  //   describe( 'walkUp', () => {
  //     it( 'walks all', () => {
  //       const expect = [ 'hello', 'left', 'root' ]
  //       const dom = parse( document, html )
  //       const start = dom.querySelector( '.hello' )
  //       const classNames = []

  //       walkUp( start, current => {
  //         const { className } = current

  //         if( className )
  //           classNames.push( className )
  //       })

  //       assert.deepEqual( expect, classNames )
  //     })

  //     it( 'early return', () => {
  //       const expect = [ 'hello', 'left' ]
  //       const dom = parse( document, html )
  //       const start = dom.querySelector( '.hello' )
  //       const classNames = []

  //       walkUp( start, current => {
  //         const { className } = current

  //         if( className )
  //           classNames.push( className )

  //         return className === 'left'
  //       })

  //       assert.deepEqual( expect, classNames )
  //     })
  //   })

  //   it( 'walkEvery', () => {
  //     const dom = parse( document, html )
  //     const expect = [ 'left', 'right' ]
  //     const result = []

  //     const predicate = node =>
  //       node.nodeType === document.ELEMENT_NODE &&
  //       (
  //         node.classList.contains( 'left' ) ||
  //         node.classList.contains( 'right' )
  //       )

  //     walkEvery( dom, predicate, node => {
  //       result.push( node.className )
  //     })

  //     assert.deepEqual( expect, result )
  //   })

  //   it( 'walkDescendants', () => {
  //     const domHtml = `
  //       <div>
  //         <div class="target a">
  //           <div class="target b"></div>
  //         </div>
  //         <div>
  //           <div class="target c"></div>
  //         </div>
  //       </div>
  //     `

  //     const dom = parse( document, domHtml )
  //     const expect = [ 'target a', 'target c' ]
  //     const result = []

  //     const predicate = node =>
  //       node.nodeType === document.ELEMENT_NODE &&
  //       node.classList.contains( 'target' )

  //     walkDescendants( dom, predicate, node => {
  //       result.push( node.className )
  //     })

  //     assert.deepEqual( expect, result )
  //   })

  //   it( 'find', () => {
  //     const dom = parse( document, html )
  //     const textNode = find( dom, current =>
  //       current.nodeType === 3 && !isWhitespaceNode( current )
  //     )

  //     assert.strictEqual( textNode.nodeValue, 'Hello' )
  //   })

  //   it( 'findDescendants', () => {
  //     const domHtml = `
  //       <div>
  //         <div class="target a">
  //           <div class="target b"></div>
  //         </div>
  //         <div>
  //           <div class="target c"></div>
  //         </div>
  //       </div>
  //     `

  //     const dom = parse( document, domHtml )
  //     const expect = [ 'target a', 'target c' ]

  //     const predicate = node =>
  //       node.nodeType === document.ELEMENT_NODE &&
  //       node.classList.contains( 'target' )

  //     const descendants = findDescendants( dom, predicate )
  //     const result = descendants.map( node => node.className )

  //     assert.deepEqual( expect, result )
  //   })

  //   it( 'filter', () => {
  //     const dom = parse( document, html )
  //     const textNodes = filter( dom, current =>
  //       current.nodeType === 3 && !isWhitespaceNode( current )
  //     )

  //     assert.strictEqual( textNodes[ 0 ].nodeValue, 'Hello' )
  //     assert.strictEqual( textNodes[ 1 ].nodeValue, 'World' )
  //   })
  // })

  // describe( 'query', () => {
  //   describe( 'select', () => {
  //     it( 'selects self', () => {
  //       const dom = parse( document, html )
  //       const div = select( dom, 'div' )

  //       assert.strictEqual( div.className, 'root' )
  //       assert.strictEqual( dom, div )
  //     })

  //     it( 'selects from non-element', () => {
  //       const fragment = document.createDocumentFragment()
  //       const dom = parse( document, html )

  //       fragment.appendChild( dom )

  //       const div = select( fragment, 'div' )

  //       assert.strictEqual( div.className, 'root' )
  //     })

  //     it( 'selects descendant', () => {
  //       const dom = parse( document, html )
  //       const left = select( dom, '.left' )

  //       assert.strictEqual( left.className, 'left' )
  //     })
  //   })

  //   describe( 'selectAll', () => {
  //     it( 'includes self', () => {
  //       const expect = [ 'root', 'left', 'right' ]
  //       const dom = parse( document, html )
  //       const divs = selectAll( dom, 'div' )
  //       const classNames = divs.map( div => div.className )

  //       assert.deepEqual( expect, classNames )
  //     })

  //     it( 'selects from non-element', () => {
  //       const expect = [ 'root', 'left', 'right' ]
  //       const fragment = document.createDocumentFragment()
  //       const dom = parse( document, html )

  //       fragment.appendChild( dom )

  //       const divs = selectAll( fragment, 'div' )
  //       const classNames = divs.map( div => div.className )

  //       assert.deepEqual( expect, classNames )
  //     })
  //   })

  //   it( 'isWhitespaceNode', () => {
  //     const pass = document.createTextNode( ' ' )
  //     const fail = document.createTextNode( 'a' )

  //     assert( isWhitespaceNode( pass ) )
  //     assert( !isWhitespaceNode( fail ) )
  //   })

  //   it( 'eachAttribute', () => {
  //     const attributes = {
  //       id: 'foo',
  //       class: 'bar',
  //       name: 'baz'
  //     }

  //     const div = document.createElement( 'div' )

  //     setAttributes( div, attributes )

  //     let currentIndex = 0

  //     eachAttribute( div, ( attribute, index ) => {
  //       const { name, value } = attribute

  //       assert.strictEqual( div.getAttribute( name ), value )
  //       assert.strictEqual( index, currentIndex )

  //       currentIndex++

  //       // test early return
  //       if( name === 'class' ) return true
  //     })

  //     assert.strictEqual( currentIndex, 2 )
  //   })
  // })

  // describe( 'manipulation', () => {
  //   describe( 'wrap', () => {
  //     it( 'wraps descendant node', () => {
  //       const expect = '<div><p>Hello</p></div>'
  //       const div = document.createElement( 'div' )
  //       const p = document.createElement( 'p' )
  //       const hello = document.createTextNode( 'Hello' )

  //       div.appendChild( hello )

  //       wrap( hello, p )

  //       assert.strictEqual( expect, div.outerHTML )
  //     })

  //     it( 'wraps root node', () => {
  //       const expect = '<p>Hello</p>'
  //       const p = document.createElement( 'p' )
  //       const hello = document.createTextNode( 'Hello' )

  //       wrap( hello, p )

  //       assert.strictEqual( expect, p.outerHTML )
  //     })
  //   })

  //   describe( 'unwrap', () => {
  //     it( 'unwraps node', () => {
  //       const expect = '<div>Hello</div>'
  //       const div = document.createElement( 'div' )
  //       const p = document.createElement( 'p' )
  //       const hello = document.createTextNode( 'Hello' )

  //       div.appendChild( p )
  //       p.appendChild( hello )

  //       unwrap( p )

  //       assert.strictEqual( expect, div.outerHTML )
  //     })

  //     it( 'throws on root', () => {
  //       const div = document.createElement( 'div' )

  //       assert.throws( () => unwrap( div ) )
  //     })
  //   })

  //   it( 'removeAll', () => {
  //     const from = '<div><strong>Hello</strong> World</div>'
  //     const expectDiv = '<div></div>'
  //     const expectRemoved = '<strong>Hello</strong> World'

  //     const div = parse( document, from )
  //     const removed = removeAll( div )

  //     assert.strictEqual( stringify( div ), expectDiv )
  //     assert.strictEqual( removed.map( stringify ).join( '' ), expectRemoved )
  //   })

  //   it( 'removeWhitespace', () => {
  //     const div = parse( document, html )

  //     removeWhitespace( div )

  //     const textNodes = filter( div, current => current.nodeType === 3 )

  //     assert.strictEqual( textNodes[ 0 ].nodeValue, 'Hello' )
  //     assert.strictEqual( textNodes[ 1 ].nodeValue, 'World' )
  //   })

  //   it( 'normalizeWhitespace', () => {
  //     const expect = '<p>Hello World</p>'
  //     const p = parse( document, '<p>Hello\n\t\r World</p>' )

  //     normalizeWhitespace( p )

  //     assert.strictEqual( expect, stringify( p ) )
  //   })

  //   it( 'rename', () => {
  //     const expect = '<div><h2 id="foo">Hello</h2></div>'
  //     const from = parse( document, '<div><h1 id="foo">Hello</h1></div>' )
  //     const h1 = select( from, 'h1' )

  //     rename( document, h1, 'h2' )

  //     assert.strictEqual( expect, stringify( from ) )
  //   })

  //   it( 'empty', () => {
  //     const div = document.createElement( 'div' )
  //     const text = document.createTextNode( 'hello' )

  //     const nodes = [ div, text ]

  //     const parent = document.createElement( 'main' )

  //     nodes.forEach( current => parent.appendChild( current ) )

  //     const removed = empty( parent )

  //     assert.strictEqual( '<main></main>', stringify( parent ) )
  //     assert.deepEqual( removed, nodes )
  //   })
  // })

  // describe( 'string functions', () => {
  //   describe( 'parse', () => {
  //     it( 'parses', () => {
  //       const el = parse( document, '<div></div>' )

  //       assert( el )
  //       assert.strictEqual( el.tagName, 'DIV' )
  //       assert.strictEqual( el.childNodes.length, 0 )
  //     })

  //     it( 'parses to fragment', () => {
  //       const fragment = parse( document, '<div></div><br />' )

  //       assert( fragment )
  //       assert.strictEqual( fragment.nodeType, 11 )
  //       assert.strictEqual( fragment.childNodes.length, 2 )
  //     })
  //   })

  //   describe( 'parseDocument', () => {
  //     it( 'parses', () => {
  //       const html = '<!doctype html><html><head><title>Hello</title></head><body><h1>Hello</h1></body></html>'
  //       const doc = parseDocument( document, html )
  //       const back = stringify( doc )

  //       assert.strictEqual( doc.nodeType, 9 )
  //       assert.strictEqual( html, back )
  //     })
  //   })

  //   describe( 'stringify', () => {
  //     it( 'stringifies', () => {
  //       const el = parse( document, '<div></div>' )
  //       const str = stringify( el )

  //       assert.strictEqual( str, '<div></div>' )
  //     })

  //     it( 'stringifies comment', () => {
  //       const el = parse( document, '<!--Hello-->' )
  //       const str = stringify( el )

  //       assert.strictEqual( str, '<!--Hello-->' )
  //     })

  //     it( 'stringifies doctype', () => {
  //       const str = stringify( document.doctype )

  //       assert.strictEqual( str, '<!doctype html>' )
  //     })

  //     it( 'stringifies non-element node', () => {
  //       const fragment = document.createDocumentFragment()
  //       const dom = parse( document, html )

  //       fragment.appendChild( dom )

  //       assert.strictEqual( stringify( fragment ), html )
  //     })
  //   })
  // })

  // describe( 'serialization', () => {
  //   it( 'serializes all nodes', () => {
  //     const html = '<!doctype html><html><head><title>Hello</title></head><body>' +
  //       '<div class="hello">world</div>' +
  //       '<!--nodeValue-->' +
  //       '</body></html>'

  //     const doc = parseDocument( document, html )

  //     const expect = stringify( doc )
  //     const serialized = serialize( doc )
  //     const deserialized = deserialize( document, serialized )
  //     const str = stringify( deserialized )

  //     assert.strictEqual( expect, str )
  //   })

  //   it( 'fails to serialize unexpected node', () => {
  //     const node = document.createProcessingInstruction( 'target', 'data' )

  //     assert.throws( () => serialize( node ) )
  //   })

  //   it( 'fails on bad deserialize arg', () => {
  //     assert.throws( () => deserialize( document, {} ) )
  //   })

  //   it( 'serializes fragments', () => {
  //     const html = '<p>1</p><p>2</p>'
  //     const fragment = parse( document, html )

  //     const expect = stringify( fragment )
  //     const serialized = serialize( fragment )
  //     const deserialized = deserialize( document, serialized )
  //     const str = stringify( deserialized )

  //     assert.strictEqual( expect, str )
  //   })

  //   it( 'fails to deserialize unexpected node', () => {
  //     assert.throws( () => deserialize( document, [ '#processing-instruction', 'target', 'data' ]  ) )
  //   })
  // })
})
