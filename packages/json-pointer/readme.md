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

## Pointer Value Arrays

Some additional functions for diffing objects

TODO, document in more depth

```js
'use strict'

const pointer = require( '@mojule/json-pointer' )

const {
  flatten, expand, pointerValueArray, pointerValueArrayToPointerMap, diff,
  newFromDiff, oldFromDiff, sortedPointerValues, globPointerValues
} = pointer

const obj = {
  a: 1,
  b: [ 2, 3 ]
}

/*
{
  '/a': 1,
  '/b/0': 2,
  '/b/1": 3
}
*/
const pointerMap = flatten( obj )

/*
[
  { pointer: '/a', value: 1, order: 0 },
  { pointer: '/b/0', value: 2, order: 1 },
  { pointer: '/b/1', value: 3, order: 2 }
]
*/
const values = pointerValueArray( obj )

// same as pointerMap
const pointerMap2 = pointerValueArrayToPointerMap( values )

const leftObj = {
  unchanged: [ [], {} ],
  changed: 0,
  unchangedArray: [ 1, 2, 3 ],
  changedArray: [ 4, 5, 6 ],
  moved: 7,
  movedAndChanged: 8,
  removed: 9
}

const rightObj = {
  unchanged: [ [], {} ],
  changed: 9,
  unchangedArray: [ 1, 2, 3 ],
  changedArray: [ 6, 4, 5 ],
  movedAndChanged: 11,
  moved: 7,
  added: 8
}

/*
[
  { pointer: '/unchanged/0', value: [], order: 0 },
  // etc...
]
*/
const left = pointerValueArray( flatten( leftObj ) )
const right = pointerValueArray( flatten( rightObj ) )

/*
note - if left or right are unsorted, diff will throw - you can call diff with
a third boolean argument set to true to explicity sort before diffing (false by
default for performance, because if you're just using the provided functions
they should always be sorted, the only time they'll be unsorted is if you're
modifying the pointer value arrays yourself) - or you can use
sortedPointerValues to sort them yourself

[
  { pointer: '/unchanged/0', value: [], order: 0 },
  { pointer: '/unchanged/1', value: {}, order: 1 },
  { pointer: '/changed', value: 0, order: 2, newValue: 9 },
  { pointer: '/unchangedArray/0', value: 1, order: 3 },
  { pointer: '/unchangedArray/1', value: 2, order: 4 },
  { pointer: '/unchangedArray/2', value: 3, order: 5 },
  { pointer: '/changedArray/0', value: 4, order: 6, newValue: 6 },
  { pointer: '/changedArray/1', value: 5, order: 7, newValue: 4 },
  { pointer: '/changedArray/2', value: 6, order: 8, newValue: 5 },
  { pointer: '/moved', value: 7, order: 9, newOrder: 10 },
  { pointer: '/movedAndChanged', value: 8, order: 10, newValue: 11, newOrder: 9 },
  { pointer: '/removed', value: 9, order: 11, delete: true },
  { pointer: '/added', value: 8, order: 11, add: true }
]
*/
const diffValues = diff( left, right )

const newPointerValues = newFromDiff( diffValues )
const oldPointerValues = oldFromDiff( diffValues )

// same as rightObj
const newObj = expand( pointerValueArrayToPointerMap( newPointerValues ) )
// same as leftObj
const oldObj = expand( pointerValueArrayToPointerMap( oldPointerValues ) )

// if you modified your pointer value array and it's out of order
const left2 = left.slice().reverse()
const sortedLeft2 = sortedPointerValues( left2 )

// filter the pointer values using glob
const filtered = globPointerValues( values, '/b/**' )
```

## License

[MIT](https://github.com/mojule/mojule/blob/master/LICENSE)
