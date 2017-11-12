# node

Generic tree node factory backed by [symbol-tree](https://github.com/jsdom/js-symbol-tree)

`npm install @mojule/node`

```javascript
const Node = require( '@mojule/node' )

const grandparent = Node( 'grandparent' )
const parent = Node( 'parent' )
const child = Node( 'child' )

grandparent.appendChild( parent )
parent.appendChild( child )
```
