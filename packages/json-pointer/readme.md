# json-pointer

[JSON Pointer](http://tools.ietf.org/html/draft-ietf-appsawg-json-pointer-08)
implementation for mojule

Heavily based on [jsonpointer](https://github.com/janl/node-jsonpointer), with
additional functions like `flatten` and `expand` added

`npm install @mojule/json-pointer`

```javascript
'use strict'

const pointer = require( '@mojule/json-pointer' )

const { get, set, compile, flatten, expand } = pointer

const obj = {
  a: 1,
  b: [ 2, 3, 4 ]
}


const a = get( obj, '/a' ) ) // 1

const b0 = get( obj, '/b/0' ) // 2

const oldValue = set( obj, '/a', -1 ) // 1

set( obj, '/b/-', 5 ) // b is now [ 2, 3, 4, 5 ]

const pointers = compile( '/b/0' ) // [ '', 'b', '0' ]

set( obj, pointers, -2 ) // b is now [ -2, 3, 4, 5 ]

/*
  {
    '/a': -1,
    '/b/0': -2,
    '/b/1': 3,
    '/b/2': 4,
    '/b/3': 5
  }
*/
const flat = flatten( obj )

// same as obj
const expanded = expand( flat )

const flat2 = {
  '/c': 6
}

// adds values from flat2 to obj
expand( flat2, obj )
```

## license

MIT
