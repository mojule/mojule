'use strict'

const assert = require( 'assert' )
const { is } = require( '@mojule/is' )
const nodeUtils = require( '@mojule/node-utils' )
const Node = require( '..' )
const biology = require( './fixtures/biology.json' )

const { deserialize } = nodeUtils

const expectStr =
`Animalia
  Chordate
    Mammal
      Primate
        Hominidae
          Homo
            Sapiens
              Human
        Pongidae
          Pan
            Troglodytes
              Chimpanzee
      Carnivora
        Felidae
          Felis
            Domestica
              House Cat
            Leo
              Lion
  Arthropoda
    Insect
      Diptera
        Muscidae
          Musca
            Domestica
              Housefly
`

const withEmpty = `

Root

  Child 1

  Child 2
    GrandChild 1

    GrandChild 2


`

const expectEmpty = 'Root\n  \n  Child 1\n  \n  Child 2\n    GrandChild 1\n    \n    GrandChild 2\n    \n    \n    \n'

describe( 'string-node', () => {
  it( 'sets value', () => {
    const root = Node( 'Root' )

    root.value = 'New Root'

    assert.equal( root.value, 'New Root' )
  })

  it( 'enforces string value', () => {
    const root = Node( 42 )

    assert.strictEqual( root.value, '42' )

    root.value = 33

    assert.strictEqual( root.value, '33' )
  })

  it( 'stringifies', () => {
    const tree = deserialize( Node, biology )
    const str = Node.stringify( tree )

    assert.equal( str, expectStr )
  })

  it( 'parses', () => {
    const tree = deserialize( Node, biology )
    const serialized = Node.stringify( tree )
    const deserialized = Node.parse( serialized )

    assert.equal( serialized, Node.stringify( deserialized ) )
  })

  it( 'parses with empty', () => {
    const deserialized = Node.parse( withEmpty, { retainEmpty: true } )
    const serialized = Node.stringify( deserialized )

    assert.equal( serialized, expectEmpty )
  })

  it( 'escapes', () => {
    const root = Node( 'Root\n' )
    const child1 = Node( 'Child\r1' )
    const child2 = Node( 'Child\r\n2' )

    root.appendChild( child1 )
    root.appendChild( child2 )

    const serialized = Node.stringify( root )
    const deserialized = Node.parse( serialized )

    assert.equal( serialized, Node.stringify( deserialized ) )
  })

  it( 'tabs', () => {
    const serialized = 'Root\n\tChild\n\t\tGrandchild'
    const root = Node.parse( serialized )
    const child = root.firstChild
    const grandChild = child.firstChild

    assert.equal( root.value, 'Root' )
    assert.equal( child.value, 'Child' )
    assert.equal( grandChild.value, 'Grandchild' )
  })

  it( 'bad nesting', () => {
    assert.throws( () => Node.parse( '  Oh noes' ) )
  })

  it( 'multiple roots', () => {
    const mult = 'Fungi\n\tOomycota\nAnimalia\n\tChordate'
    assert.throws( () => Node.parse( mult ) )

    const roots = Node.parse( mult, { deserializeMultiple : true } )
    assert.equal( roots.length, 2 )
  })

  it( 'empty file', () => {
    assert.throws( () => Node.parse( '', { retainEmpty: true } ) )
  })
})
