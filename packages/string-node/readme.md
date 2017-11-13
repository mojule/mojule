# string-node

A package for trees where the node values are strings

`npm install @mojule/string-node`

```javascript
const StringNode = require( '@mojule/string-node' )

const root = Node( 'Root' )
const child = Node( 'Child' )

root.appendChild( child )
```

Exactly the same as `Node` except that it enforces the value being a string (via
`String( value )` ) and has two static methods, `stringify` and `parse`

## StringNode.stringify( str )

Creates a string representation of the tree. EOL characters within string nodes
are normalized to \n and escaped.

[The example data used, as raw nodes](test/fixtures/biology.json)

```javascript
const nodeUtils = require( '@mojule/node-utils' )
const StringNode = require( '@mojule/string-node' )
const data = require( './test/fixtures/biology.json' )

const { deserialize } = nodeUtils

const tree = deserialize( StringNode, data )

console.log( StringNode.stringify( tree ) )
```

```
Animalia
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
```

## StringNode.parse

The default behaviour is to take a tree as a string in the format outlined above and
returns a root node with child nodes nested as appropriate.

- root must have no indent.
- will throw if there is more than one root or nesting doesn't make sense.
- tabs are converted to two spaces.
- EOL within strings is expected to be escaped, eg `\n` rather than a literal
  EOL.
- empty lines are ignored unless the option `retainEmpty` is passed, see below.

If the `deserializeMultiple : true` option is set there may be multiple roots in the passed string.
Returns an array of root nodes with child nodes nested as appropriate.

```javascript
const data = `
Root
  Child 1
    Grandchild 1
  Child 2
    Grandchild 2
`

const root = StringNode.parse( data )

// 'Root'
console.log( root.value )

const child = root.firstChild

// 'Child'
console.log( child.value )

// etc.
```

### options

You can pass an optional `options` parameter. By default it is:

```json
{
  "retainEmpty": false
}
```

Even with `retainEmpty` set to true, any leading empty lines are removed, as
they cannot have a parent to be added to.

Empty lines between non-empty lines are added at the same level as the next
non-empty line.

Empty lines at the end of the data are added at the same level as the previous
non-empty line.

The value property of an empty node will be an empty string.

```javascript
const data = `

Root

  Child 1

    Grandchild 1
  Child 2
    Grandchild 2

`

const root = StringNode.parse( data, { retainEmpty: true } )

console.log( StringNode.stringify( root ).replace( / /g, '.' ) )
```

```
Root
..
..Child.1
....
....Grandchild.1
..Child.2
....Grandchild.2
....
....
```