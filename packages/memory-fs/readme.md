# memory-fs

A simple in-memory filesystem. Holds data in a javascript object.

Forked from [memory-fs](https://github.com/webpack/memory-fs) in order to allow
promisifying the functions, see Changes below

``` javascript
const MemoryFS = require( '@mojule/memory-fs' )
const fs = MemoryFS()

fs.mkdirpSync( '/a/test/dir' )
fs.writeFileSync( '/a/test/dir/file.txt', 'Hello World' )
fs.readFileSync( '/a/test/dir/file.txt' ) // returns Buffer( "Hello World" )

// Async variants too
fs.unlink( '/a/test/dir/file.txt', err => {
  // ...
})

fs.readdirSync( '/a/test' ) // returns [ 'dir' ]
fs.statSync( '/a/test/dir' ).isDirectory() // returns true
fs.rmdirSync( '/a/test/dir' )

fs.mkdirpSync( 'C:\\use\\windows\\style\\paths' )
```

## Options

You can patch the API by passing options - MemoryFS is missing many functions
from `fs`, you can add them as needed, or you can add custom functions

Patch functions have the same signature as the original function except for
taking an additional first argument, `fs` - this object contains all of the
existing functions and the `data` property that holds the backing store

```javascript
const MemoryFS = require( '@mojule/memory-fs' )

// when called on `fs` instance the signature will be isEmptyFileSync( path )
const isEmptyFileSync = ( fs, path ) => {
  const file = fs.readFileSync( path )

  return file.length === 0
}

const api = { isEmptyFileSync }
const asyncNames = 'isEmptyFile'

const fs = MemoryFS( {}, { api, asyncNames } )

fs.writeFileSync( 'test.txt', 'abc' )
fs.writeFileSync( 'empty.txt', '' )

fs.isEmptyFileSync( 'test.txt' ) // false
fs.isEmptyFileSync( 'empty.txt' ) // true

fs.isEmptyFile( 'empty.txt', ( err, result ) => {
  if( err ) return console.error( err )

  console.log( result )
})
```

If you want to patch existing methods, require the existing api.js from the src
folder, get the method(s) you want, and write a wrapper method that can call
the original:

```javascript
const MemoryFS = require( '@mojule/memory-fs' )
const existing = require( '@mojule/memory-fs/src/api' )

const log = [ 'writeFile', 'mkdir' ]

const api = {}

log.forEach( name => {
  api[ name ] = ( ...args ) => {
    console.log( ...args )

    return existing[ name ]( ...args )
  }
})

// writeFile and mkdir should now log their args out when called
const fs = MemoryFS( {}, { api } )
```

## Changes from webpack/memory-fs

- `MemoryFS` is a factory function rather than a class constructor, so that the
  resultant `fs` methods can be promisified without having to call `.bind`.
  It should be completely backwards compatible aside from you have to drop the
  `new` when instantiating it, and some utility functions being moved (below)
- Cleaned up conversion of sync -> async functions
- Extracted repeated code throughout wherever it was traversing the data with a
  path out to a single function to make it easier to maintain and allow a
  possible refactor in future to use different backing stores
- Moved `normalize`, `join` and `pathToArray` utility functions from `fs`
  instance to MemoryFS - eg `MemoryFS.normalize( ... )` etc.
- Made the API patchable via options

## License

MIT
