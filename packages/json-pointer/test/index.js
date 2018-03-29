'use strict'

const { is } = require( '@mojule/is' )
const assert = require( 'assert' )
const pointer = require( '..' )

const { get, set, compile, flatten, expand, pointers, glob } = pointer

const Obj = () => ({
  a: 1,
  b: {
    c: 2
  },
  d: {
    e: [ { a: 3 }, { b: 4 }, { c: 5 } ]
  }
})

const Arr = () => [ 'a', 'b', 'c' ]

const validateError = re =>
  err => ( err instanceof Error ) && re.test( err.message )

const pointerError = validateError( /^Invalid JSON pointer/ )
const inputError = validateError( /^Invalid input/ )
const jsonError = validateError( /^Expected JSON compatible value/ )

describe( 'pointer', () => {
  describe( 'get', () => {
    it( 'gets from object', () => {
      const obj = Obj()

      assert.equal( get( obj, '/a' ), 1 )
      assert.equal( get( obj, '/b/c' ), 2 )
      assert.equal( get( obj, '/d/e/0/a' ), 3 )
      assert.equal( get( obj, '/d/e/1/b' ), 4 )
      assert.equal( get( obj, '/d/e/2/c' ), 5 )
    })

    it( 'gets from array', () => {
      const arr = Arr()

      assert.equal( get( arr, '/0' ), 'a' )
      assert.equal( get( arr, '/1' ), 'b' )
      assert.equal( get( arr, '/2' ), 'c' )
      assert.equal( get( arr, '/3' ), undefined )
      assert.equal( get( arr, '/-' ), undefined )
    })

    it( 'gets root value', () => {
      const obj = Obj()

      assert.equal( get( obj, '' ), obj )
    })

    it( 'returns "undefined" when path extends beyond any existing objects', () => {
      const obj = Obj()

      assert.strictEqual( get( obj, '/x/y/z' ), undefined )
    })

    it( 'throws on bad paths', () => {
      const obj = Obj()

      assert.throws( () => get( obj, 'a' ), pointerError )
      assert.throws( () => get( obj, 'a/' ), pointerError )
    })

    it( 'throws on bad input value', () => {
      assert.throws( () => get( 'bad', '/0' ), inputError )
    })
  })

  describe( 'set', () => {
    it( 'set returns old values', () => {
      const obj = Obj()

      assert.equal( set( obj, '/a', 2 ), 1 )
      assert.equal( set( obj, '/b/c', 3 ), 2 )
      assert.equal( set( obj, '/d/e/0/a', 4 ), 3 )
      assert.equal( set( obj, '/d/e/1/b', 5 ), 4 )
      assert.equal( set( obj, '/d/e/2/c', 6 ), 5 )
      assert.equal( get( obj, '/a' ), 2 )
      assert.equal( get( obj, '/b/c' ), 3 )
      assert.equal( get( obj, '/d/e/0/a' ), 4 )
      assert.equal( get( obj, '/d/e/1/b' ), 5 )
      assert.equal( get( obj, '/d/e/2/c' ), 6 )
    })

    it( 'sets nested values', () => {
      const obj = Obj()

      assert.equal( set( obj, '/f/g/h/i', 6 ), undefined )
      assert.equal( get( obj, '/f/g/h/i' ), 6 )
    })

    it( 'sets an array', () => {
      const obj = Obj()

      assert.equal( set( obj, '/f/g/h/foo/-', 'test' ), undefined )

      const arrValue = get( obj, '/f/g/h/foo' )

      assert( Array.isArray( arrValue ) )
      assert.equal( arrValue[ 0 ], 'test' )
    })

    it( 'sets "null" as a value', () => {
      const obj = Obj()

      set( obj, '/f/g/h/foo/-', 'test' )

      assert.equal( set( obj, '/f/g/h/foo/0', null ), 'test' )
      assert.strictEqual( get( obj, '/f/g/h/foo/0' ), null )
      assert.equal( set( obj, '/b/c', null ), 2 )
      assert.strictEqual( get( obj, '/b/c' ), null )
    })

    it( 'can unset values with "undefined"', () => {
      const obj = Obj()

      set( obj, '/a', undefined )
      assert.strictEqual( get( obj, '/a' ), undefined )
      set( obj, '/d/e/1', undefined )
      assert.strictEqual( get( obj, '/d/e/1' ), undefined )
    })

    it( 'throws on bad input value', () => {
      assert.throws( () => set( 'bad', '/0', 'B' ), inputError )
    })

    it( 'throws on bad compiled pointer', () => {
      assert.throws( () => set( [], [], 'Bad' ), pointerError )
    })
  })

  describe( 'compile', () => {
    it( 'compiles pointer', () => {
      const a = { foo: 'bar' }
      const ptr = compile( '/foo' )

      assert.equal( ptr.get( a ), 'bar' )
      assert.equal( ptr.set( a, 'test' ), 'bar' )
      assert.equal( ptr.get( a ), 'test' )
      assert.deepEqual( a, { foo: 'test' } )
    })

    it( 'throws on bad pointer', () => {
      assert.throws( () => compile( {} ), pointerError )
    })
  })

  describe( 'flatten', () => {
    it( 'flattens object', () => {
      const obj = Obj()
      const expect = {
        "/a": 1,
        "/b/c": 2,
        "/d/e/0/a": 3,
        "/d/e/1/b": 4,
        "/d/e/2/c": 5
      }
      const flattened = flatten( obj )

      assert.deepEqual( flattened, expect )
    })

    it( 'flattens array', () => {
      const arr = Arr()
      const expect = {
        "/0": "a",
        "/1": "b",
        "/2": "c"
      }
      const flattened = flatten( arr )

      assert.deepEqual( flattened, expect )
    })

    it( 'only flattens when flattenable', () => {
      const str = 'a'
      const result = flatten( str )

      assert.strictEqual( str, result )
    })

    it( 'throws on bad JSON input', () => {
      const a = {}
      const b = { a }

      a.b = b

      assert.throws( () => flatten( a ), jsonError )
    })
  })

  describe( 'expand', () => {
    it( 'expands object', () => {
      const expect = Obj()
      const flattened = flatten( expect )
      const result = expand( flattened )

      assert.deepEqual( result, expect )
    })

    it( 'expands array', () => {
      const expect = Arr()
      const flattened = flatten( expect )
      const result = expand( flattened )

      assert( is.array( result ) )
      assert.deepEqual( result, expect )
    })

    it( 'returns target when no source keys', () => {
      const expect = [ 1, 2, 3 ]
      const result = expand( {}, expect )

      assert.strictEqual( result, expect )
    })

    it( 'returns empty object when no source keys', () => {
      const expect = {}
      const result = expand( {} )

      assert.deepEqual( result, expect )
    })

    it( 'expands to existing object', () => {
      const existing = { a: 1 }
      const flattened = { '/b': 2 }
      const expect = { a: 1, b: 2 }
      const result = expand( flattened, existing )

      assert.deepEqual( result, expect )
    })

    it( 'expands to existing array', () => {
      const existing = [ 1 ]
      const flattened = { '/1': 2 }
      const expect = [ 1, 2 ]
      const result = expand( flattened, existing )

      assert( is.array( result ) )
      assert.deepEqual( result, expect )
    })

    it( 'throws on bad source', () => {
      assert.throws( () => expand( 'abc' ), inputError )
    })
  })

  describe( 'pointers', () => {
    it( 'gets pointers for an object', () => {
      const obj = {
        a: 1,
        b: [ 2, 3, 4 ]
      }

      const expect = [ '', '/a', '/b', '/b/0', '/b/1', '/b/2' ]

      const p = pointers( obj )

      assert.deepEqual( p, expect )
    })

    it( 'gets pointers for an array', () => {
      const arr = [
        { a: 1 },
        { b: 2 }
      ]

      const expect = [ '', '/0', '/0/a', '/1', '/1/b' ]

      const p = pointers( arr )

      assert.deepEqual( p, expect )
    })

    it( 'not an object or array', () => {
      assert.deepEqual( pointers( 'foo' ), [] )
    })

    it( 'throws on bad JSON', () => {
      const a = { foo: 'bar' }
      const b = { baz: 'qux' }

      a.b = b
      b.a = a

      assert.throws( () => pointers( a ) )
    })
  })

  describe( 'glob', () => {
    it( 'globs root properties', () => {
      const obj = {
        a: 1,
        b: [ 2, 3, 4 ]
      }

      const properties = glob( obj, '/*' )

      const expect = [ 1, [ 2, 3, 4 ] ]

      assert.deepEqual( properties, expect )
    })

    it( 'globs array range', () => {
      const obj = {
        a: 1,
        b: [ 2, 3, 4 ]
      }

      const properties = glob( obj, '/b/[1-2]' )

      const expect = [ 3, 4 ]

      assert.deepEqual( properties, expect )
    })
  })

  describe( 'complex keys', () => {
    const complexKeys = {
      'a/b': {
        c: 1
      },
      d: {
        'e/f': 2
      },
      '~1': 3,
      '01': 4
    }

    it( 'unescapes correctly', () => {
      assert.equal( get( complexKeys, '/a~1b/c' ), 1 )
      assert.equal( get( complexKeys, '/d/e~1f' ), 2 )
      assert.equal( get( complexKeys, '/~01' ), 3 )
      assert.equal( get( complexKeys, '/01' ), 4 )
      assert.equal( get( complexKeys, '/a/b/c' ), null )
      assert.equal( get( complexKeys, '/~1' ), null )
    })
  })

  describe( 'special array rules', () => {
    it( 'follows draft-ietf-appsawg-json-pointer-08', () => {
      const ary = [ 'zero', 'one', 'two' ]
      assert.equal( get( ary, '/01' ), null )

      assert.equal( set( ary, '/-', 'three' ), null )
      assert.equal( ary[ 3 ], 'three' )
    })
  })

  describe( 'draft examples', () => {
    const example = {
      'foo': [ 'bar', 'baz' ],
      '': 0,
      'a/b': 1,
      'c%d': 2,
      'e^f': 3,
      'g|h': 4,
      'i\\j': 5,
      'k\'l': 6,
      ' ': 7,
      'm~n': 8
    }

    it( 'matches expected results from draft', () => {
      assert.equal( get( example, '' ), example )
      const ans = get( example, '/foo' )
      assert.equal( ans.length, 2 )
      assert.equal( ans[ 0 ], 'bar' )
      assert.equal( ans[ 1 ], 'baz' )
      assert.equal( get( example, '/foo/0' ), 'bar' )
      assert.equal( get( example, '/' ), 0 )
      assert.equal( get( example, '/a~1b' ), 1 )
      assert.equal( get( example, '/c%d' ), 2 )
      assert.equal( get( example, '/e^f' ), 3 )
      assert.equal( get( example, '/g|h' ), 4 )
      assert.equal( get( example, '/i\\j' ), 5 )
      assert.equal( get( example, '/k\'l' ), 6 )
      assert.equal( get( example, '/ ' ), 7 )
      assert.equal( get( example, '/m~0n' ), 8 )
    })
  })
})
