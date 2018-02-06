# json-pointer

[JSON Pointer](http://tools.ietf.org/html/draft-ietf-appsawg-json-pointer-08)
implementation for mojule

Heavily based on [jsonpointer](https://github.com/janl/node-jsonpointer), with
additional functions like `flatten`, `expand`, `pointers` and `glob` added

`npm install @mojule/json-pointer`

```javascript
'use strict'

const pointer = require( '@mojule/json-pointer' )

const { get, set, compile, flatten, expand, pointers, glob } = pointer

const obj = {
  a: 1,
  b: [ 2, 3, 4 ]
}

const p = pointers( obj ) // [ '/', '/a', '/b', '/b/0', '/b/1', '/b/2' ]

const a = get( obj, '/a' ) ) // 1

const b0 = get( obj, '/b/0' ) // 2

const oldValue = set( obj, '/a', -1 ) // 1

set( obj, '/b/-', 5 ) // b is now [ 2, 3, 4, 5 ]

const compiled = compile( '/b/0' ) // [ '', 'b', '0' ]

set( obj, compiled, -2 ) // b is now [ -2, 3, 4, 5 ]

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

## glob

`glob` is just a thin wrapper over [micromatch](https://github.com/micromatch/micromatch)

The first argument is the JSON object or array (other values will return an
empty array), and the remaining arguments are passed directly to micromatch

```
glob( source, patterns[, options] )
```

```javascript
const obj = {
  a: 1,
  b: [ 2, 3, 4 ]
}

const properties = glob( obj, '/*' ) // [ 1, [ 2, 3, 4 ] ]
const subArr = glob( obj, '/b/[1-2]' ) // [ 3, 4 ]
```

## License

[MIT](https://github.com/mojule/mojule/blob/master/LICENSE)
