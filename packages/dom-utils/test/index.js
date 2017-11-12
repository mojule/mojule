'use strict'

const assert = require( 'assert' )
const fs = require( 'fs' )
const document = require( '@mojule/document' )
const utils = require( '../' )

const {
  walk, walkUp, walkEvery, walkDescendants, find, filter, findDescendants,
  removeAll, select, selectAll, wrap, unwrap, isWhitespaceNode,
  removeWhitespace, normalizeWhitespace, parse, parseDocument, stringify,
  getAttributes, setAttributes, createEmptyDocument, serialize, deserialize,
  eachAttribute, rename, empty
} = utils

describe( 'dom utils', () => {
  let html = ''

  before( done => {
    fs.readFile( './test/fixtures/index.html', 'utf8', ( err, data ) => {
      if( err ) throw err

      html = data

      done()
    })
  })

  describe( 'traversal', () => {
    describe( 'walk', () => {
      it( 'walks all', () => {
        const expect = [ 'root', 'left', 'hello', 'right', 'world' ]
        const dom = parse( document, html )
        const classNames = []

        walk( dom, current => {
          const { className } = current

          if( className )
            classNames.push( className )
        })

        assert.deepEqual( expect, classNames )
      })

      it( 'walks all', () => {
        const expect = [ 'root', 'left', 'hello', 'right', 'world' ]
        const dom = parse( document, html )
        const classNames = []

        walk( dom, current => {
          const { className } = current

          if( className )
            classNames.push( className )
        })

        assert.deepEqual( expect, classNames )
      })
    })

    describe( 'walkUp', () => {
      it( 'walks all', () => {
        const expect = [ 'hello', 'left', 'root' ]
        const dom = parse( document, html )
        const start = dom.querySelector( '.hello' )
        const classNames = []

        walkUp( start, current => {
          const { className } = current

          if( className )
            classNames.push( className )
        })

        assert.deepEqual( expect, classNames )
      })

      it( 'early return', () => {
        const expect = [ 'hello', 'left' ]
        const dom = parse( document, html )
        const start = dom.querySelector( '.hello' )
        const classNames = []

        walkUp( start, current => {
          const { className } = current

          if( className )
            classNames.push( className )

          return className === 'left'
        })

        assert.deepEqual( expect, classNames )
      })
    })

    it( 'walkEvery', () => {
      const dom = parse( document, html )
      const expect = [ 'left', 'right' ]
      const result = []

      const predicate = node =>
        node.nodeType === document.ELEMENT_NODE &&
        (
          node.classList.contains( 'left' ) ||
          node.classList.contains( 'right' )
        )

      walkEvery( dom, predicate, node => {
        result.push( node.className )
      })

      assert.deepEqual( expect, result )
    })

    it( 'walkDescendants', () => {
      const domHtml = `
        <div>
          <div class="target a">
            <div class="target b"></div>
          </div>
          <div>
            <div class="target c"></div>
          </div>
        </div>
      `

      const dom = parse( document, domHtml )
      const expect = [ 'target a', 'target c' ]
      const result = []

      const predicate = node =>
        node.nodeType === document.ELEMENT_NODE &&
        node.classList.contains( 'target' )

      walkDescendants( dom, predicate, node => {
        result.push( node.className )
      })

      assert.deepEqual( expect, result )
    })

    it( 'find', () => {
      const dom = parse( document, html )
      const textNode = find( dom, current =>
        current.nodeType === 3 && !isWhitespaceNode( current )
      )

      assert.strictEqual( textNode.nodeValue, 'Hello' )
    })

    it( 'findDescendants', () => {
      const domHtml = `
        <div>
          <div class="target a">
            <div class="target b"></div>
          </div>
          <div>
            <div class="target c"></div>
          </div>
        </div>
      `

      const dom = parse( document, domHtml )
      const expect = [ 'target a', 'target c' ]

      const predicate = node =>
        node.nodeType === document.ELEMENT_NODE &&
        node.classList.contains( 'target' )

      const descendants = findDescendants( dom, predicate )
      const result = descendants.map( node => node.className )

      assert.deepEqual( expect, result )
    })

    it( 'filter', () => {
      const dom = parse( document, html )
      const textNodes = filter( dom, current =>
        current.nodeType === 3 && !isWhitespaceNode( current )
      )

      assert.strictEqual( textNodes[ 0 ].nodeValue, 'Hello' )
      assert.strictEqual( textNodes[ 1 ].nodeValue, 'World' )
    })
  })

  describe( 'query', () => {
    describe( 'select', () => {
      it( 'selects self', () => {
        const dom = parse( document, html )
        const div = select( dom, 'div' )

        assert.strictEqual( div.className, 'root' )
        assert.strictEqual( dom, div )
      })

      it( 'selects from non-element', () => {
        const fragment = document.createDocumentFragment()
        const dom = parse( document, html )

        fragment.appendChild( dom )

        const div = select( fragment, 'div' )

        assert.strictEqual( div.className, 'root' )
      })

      it( 'selects descendant', () => {
        const dom = parse( document, html )
        const left = select( dom, '.left' )

        assert.strictEqual( left.className, 'left' )
      })
    })

    describe( 'selectAll', () => {
      it( 'includes self', () => {
        const expect = [ 'root', 'left', 'right' ]
        const dom = parse( document, html )
        const divs = selectAll( dom, 'div' )
        const classNames = divs.map( div => div.className )

        assert.deepEqual( expect, classNames )
      })

      it( 'selects from non-element', () => {
        const expect = [ 'root', 'left', 'right' ]
        const fragment = document.createDocumentFragment()
        const dom = parse( document, html )

        fragment.appendChild( dom )

        const divs = selectAll( fragment, 'div' )
        const classNames = divs.map( div => div.className )

        assert.deepEqual( expect, classNames )
      })
    })

    it( 'isWhitespaceNode', () => {
      const pass = document.createTextNode( ' ' )
      const fail = document.createTextNode( 'a' )

      assert( isWhitespaceNode( pass ) )
      assert( !isWhitespaceNode( fail ) )
    })

    it( 'eachAttribute', () => {
      const attributes = {
        id: 'foo',
        class: 'bar',
        name: 'baz'
      }

      const div = document.createElement( 'div' )

      setAttributes( div, attributes )

      let currentIndex = 0

      eachAttribute( div, ( attribute, index ) => {
        const { name, value } = attribute

        assert.strictEqual( div.getAttribute( name ), value )
        assert.strictEqual( index, currentIndex )

        currentIndex++

        // test early return
        if( name === 'class' ) return true
      })

      assert.strictEqual( currentIndex, 2 )
    })
  })

  describe( 'manipulation', () => {
    describe( 'wrap', () => {
      it( 'wraps descendant node', () => {
        const expect = '<div><p>Hello</p></div>'
        const div = document.createElement( 'div' )
        const p = document.createElement( 'p' )
        const hello = document.createTextNode( 'Hello' )

        div.appendChild( hello )

        wrap( hello, p )

        assert.strictEqual( expect, div.outerHTML )
      })

      it( 'wraps root node', () => {
        const expect = '<p>Hello</p>'
        const p = document.createElement( 'p' )
        const hello = document.createTextNode( 'Hello' )

        wrap( hello, p )

        assert.strictEqual( expect, p.outerHTML )
      })
    })

    describe( 'unwrap', () => {
      it( 'unwraps node', () => {
        const expect = '<div>Hello</div>'
        const div = document.createElement( 'div' )
        const p = document.createElement( 'p' )
        const hello = document.createTextNode( 'Hello' )

        div.appendChild( p )
        p.appendChild( hello )

        unwrap( p )

        assert.strictEqual( expect, div.outerHTML )
      })

      it( 'throws on root', () => {
        const div = document.createElement( 'div' )

        assert.throws( () => unwrap( div ) )
      })
    })

    it( 'removeAll', () => {
      const from = '<div><strong>Hello</strong> World</div>'
      const expectDiv = '<div></div>'
      const expectRemoved = '<strong>Hello</strong> World'

      const div = parse( document, from )
      const removed = removeAll( div )

      assert.strictEqual( stringify( div ), expectDiv )
      assert.strictEqual( removed.map( stringify ).join( '' ), expectRemoved )
    })

    it( 'removeWhitespace', () => {
      const div = parse( document, html )

      removeWhitespace( div )

      const textNodes = filter( div, current => current.nodeType === 3 )

      assert.strictEqual( textNodes[ 0 ].nodeValue, 'Hello' )
      assert.strictEqual( textNodes[ 1 ].nodeValue, 'World' )
    })

    it( 'normalizeWhitespace', () => {
      const expect = '<p>Hello World</p>'
      const p = parse( document, '<p>Hello\n\t\r World</p>' )

      normalizeWhitespace( p )

      assert.strictEqual( expect, stringify( p ) )
    })

    it( 'rename', () => {
      const expect = '<div><h2 id="foo">Hello</h2></div>'
      const from = parse( document, '<div><h1 id="foo">Hello</h1></div>' )
      const h1 = select( from, 'h1' )

      rename( document, h1, 'h2' )

      assert.strictEqual( expect, stringify( from ) )
    })

    it( 'empty', () => {
      const div = document.createElement( 'div' )
      const text = document.createTextNode( 'hello' )

      const nodes = [ div, text ]

      const parent = document.createElement( 'main' )

      nodes.forEach( current => parent.appendChild( current ) )

      const removed = empty( parent )

      assert.strictEqual( '<main></main>', stringify( parent ) )
      assert.deepEqual( removed, nodes )
    })
  })

  describe( 'string functions', () => {
    describe( 'parse', () => {
      it( 'parses', () => {
        const el = parse( document, '<div></div>' )

        assert( el )
        assert.strictEqual( el.tagName, 'DIV' )
        assert.strictEqual( el.childNodes.length, 0 )
      })

      it( 'parses to fragment', () => {
        const fragment = parse( document, '<div></div><br />' )

        assert( fragment )
        assert.strictEqual( fragment.nodeType, 11 )
        assert.strictEqual( fragment.childNodes.length, 2 )
      })
    })

    describe( 'parseDocument', () => {
      it( 'parses', () => {
        const html = '<!doctype html><html><head><title>Hello</title></head><body><h1>Hello</h1></body></html>'
        const doc = parseDocument( document, html )
        const back = stringify( doc )

        assert.strictEqual( doc.nodeType, 9 )
        assert.strictEqual( html, back )
      })
    })

    describe( 'stringify', () => {
      it( 'stringifies', () => {
        const el = parse( document, '<div></div>' )
        const str = stringify( el )

        assert.strictEqual( str, '<div></div>' )
      })

      it( 'stringifies comment', () => {
        const el = parse( document, '<!--Hello-->' )
        const str = stringify( el )

        assert.strictEqual( str, '<!--Hello-->' )
      })

      it( 'stringifies doctype', () => {
        const str = stringify( document.doctype )

        assert.strictEqual( str, '<!doctype html>' )
      })

      it( 'stringifies non-element node', () => {
        const fragment = document.createDocumentFragment()
        const dom = parse( document, html )

        fragment.appendChild( dom )

        assert.strictEqual( stringify( fragment ), html )
      })
    })
  })

  describe( 'serialization', () => {
    it( 'serializes all nodes', () => {
      const html = '<!doctype html><html><head><title>Hello</title></head><body>' +
        '<div class="hello">world</div>' +
        '<!--nodeValue-->' +
        '</body></html>'

      const doc = parseDocument( document, html )

      const expect = stringify( doc )
      const serialized = serialize( doc )
      const deserialized = deserialize( document, serialized )
      const str = stringify( deserialized )

      assert.strictEqual( expect, str )
    })

    it( 'fails to serialize unexpected node', () => {
      const node = document.createProcessingInstruction( 'target', 'data' )

      assert.throws( () => serialize( node ) )
    })

    it( 'fails on bad deserialize arg', () => {
      assert.throws( () => deserialize( document, {} ) )
    })

    it( 'serializes fragments', () => {
      const html = '<p>1</p><p>2</p>'
      const fragment = parse( document, html )

      const expect = stringify( fragment )
      const serialized = serialize( fragment )
      const deserialized = deserialize( document, serialized )
      const str = stringify( deserialized )

      assert.strictEqual( expect, str )
    })

    it( 'fails to deserialize unexpected node', () => {
      assert.throws( () => deserialize( document, [ '#processing-instruction', 'target', 'data' ]  ) )
    })
  })
})
