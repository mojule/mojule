'use strict'

const assert = require( 'assert' )
const tv4 = require( 'tv4' )
const is = require( '../src/is' )
const schema = require( '../src/schema.json' )
const Node = require( '..' )
const MemoryFS = require( '@mojule/memory-fs' )

describe( 'VFS node', () => {
  describe( 'factory', () => {
    it( 'directory', () => {
      const directory = Node.createDirectory( 'test' )
      const expect = {
        filename: 'test',
        type: 'directory'
      }

      assert.deepEqual( directory.value, expect )
      assert.strictEqual( directory.data, undefined )
      assert.strictEqual( directory.encoding, undefined )
      assert.strictEqual( directory.slug, 'test' )
      assert.strictEqual( directory.filename, 'test' )
      assert.strictEqual( directory.type, 'directory' )
    })

    it( 'text file, auto', () => {
      const file = Node.createFile( 'test.txt', 'ABC' )

      assert.strictEqual( file.data, 'ABC' )
      assert.strictEqual( file.encoding, 'utf8' )
      assert.strictEqual( file.slug, 'test.txt' )
      assert.strictEqual( file.filename, 'test.txt' )
      assert.strictEqual( file.type, 'file' )
    })

    it( 'text file', () => {
      const file = Node.createFile( 'test.txt', 'ABC', 'ascii' )

      assert.strictEqual( file.data, 'ABC' )
      assert.strictEqual( file.encoding, 'ascii' )
      assert.strictEqual( file.slug, 'test.txt' )
      assert.strictEqual( file.filename, 'test.txt' )
      assert.strictEqual( file.type, 'file' )
    })

    it( 'binary from bytes', () => {
      const file = Node.createFile( 'test.bin', [ 65, 66, 67 ] )

      assert.deepEqual( file.data, [ 65, 66, 67 ] )
      assert.strictEqual( file.encoding, undefined )
      assert.strictEqual( file.slug, 'test.bin' )
      assert.strictEqual( file.filename, 'test.bin' )
      assert.strictEqual( file.type, 'file' )
    })

    it( 'binary from buffer', () => {
      const file = Node.createFile( 'test.bin', Buffer.from( [ 65, 66, 67 ] ) )

      assert.deepEqual( file.data, [ 65, 66, 67 ] )
      assert.strictEqual( file.encoding, undefined )
      assert.strictEqual( file.slug, 'test.bin' )
      assert.strictEqual( file.filename, 'test.bin' )
      assert.strictEqual( file.type, 'file' )
    })

    it( 'binary from JSON buffer', () => {
      const file = Node.createFile( 'test.bin', Buffer.from( [ 65, 66, 67 ] ).toJSON() )

      assert.deepEqual( file.data, [ 65, 66, 67 ] )
      assert.strictEqual( file.encoding, undefined )
      assert.strictEqual( file.slug, 'test.bin' )
      assert.strictEqual( file.filename, 'test.bin' )
      assert.strictEqual( file.type, 'file' )
    })

    it( 'rename file', () => {
      const directory = Node.createDirectory( 'foo' )

      directory.filename = 'bar'

      assert.strictEqual( directory.filename, 'bar' )
      assert.deepEqual( directory.value, {
        filename: 'bar',
        type: 'directory'
      })
    })

    it( 'writeFile', () => {
      const file = Node.createFile( 'test.txt', 'ABC' )

      file.writeFile( 'XYZ', 'ascii' )

      assert.deepEqual( file.value, {
        filename: 'test.txt',
        type: 'file',
        data: 'XYZ',
        encoding: 'ascii'
      })
    })

    it( 'bad binary data', () => {
      assert.throws( () => Node.createFile( 'test.bin' ) )
    })

    it( 'bad filename', () => {
      const directory = Node.createDirectory( 'test' )

      assert.throws( () => Node.createDirectory( '' ) )
      assert.throws( () => Node.createDirectory( 'a/b' ) )
      assert.throws( () => {
        directory.filename = ''
      })
    })

    it( 'bad value', () => {
      assert.throws( () => Node() )
    })

    it( 'bad writeFile', () => {
      const file = Node.createFile( 'test.txt', 'ABC' )

      assert.throws( () => file.writeFile( 'test.txt', 42 ) )
    })

    it( 'readonly properties', () => {
      const file = Node.createFile( 'test.txt', 'ABC' )

      const { value } = file

      file.value = undefined

      assert.deepEqual( file.value, value )
    })

    it( 'actualizes', () => {
      const fs = MemoryFS()

      const directory = Node.createDirectory( 'root' )
      const sub = Node.createDirectory( 'sub' )
      const file = Node.createFile( 'test.txt', 'ABC' )
      const subFile = Node.createFile( 'sub.txt', 'XYZ' )

      directory.appendChild( file )
      directory.appendChild( sub )
      sub.appendChild( subFile )

      Node.actualize( fs, directory, '/', err => {
        assert( !err )

        const { data } = fs

        assert( is.object( data.root ) )
        assert( is.object( data.root.sub ) )
        assert( is.buffer( data.root[ 'test.txt' ] ) )
        assert( is.buffer( data.root.sub[ 'sub.txt' ] ) )
        assert.strictEqual( data.root[ 'test.txt' ].toString( 'utf8' ), 'ABC' )
        assert.strictEqual( data.root.sub[ 'sub.txt' ].toString( 'utf8' ), 'XYZ' )
      })
    })
  })

  describe( 'schema', () => {
    it( 'directory', () => {
      const directory = {
        filename: 'test',
        type: 'directory'
      }

      assert( tv4.validate( directory, schema ) )
    })

    it( 'text file', () => {
      const textFile = {
        filename: 'test.txt',
        type: 'file',
        encoding: 'utf8',
        data: 'ABC'
      }

      assert( tv4.validate( textFile, schema ) )
    })

    it( 'binary file', () => {
      const binaryFile = {
        filename: 'test.bin',
        type: 'file',
        data: [ 65, 66, 67 ]
      }

      assert( tv4.validate( binaryFile, schema ) )
    })

    it( 'no type', () => {
      const noTypeFile = {
        filename: 'test'
      }

      assert( !tv4.validate( noTypeFile, schema ) )
    })

    it( 'bad type', () => {
      const badTypeFile = {
        filename: 'test',
        type: 'bad'
      }

      assert( !tv4.validate( badTypeFile, schema ) )
    })

    it( 'bad encoding', () => {
      const badEncodingFile = {
        filename: 'test.txt',
        type: 'file',
        encoding: 'bad',
        data: 'ABC'
      }

      assert( !tv4.validate( badEncodingFile, schema ) )
    })

    it( 'bad text data', () => {
      const badTextDataFile = {
        filename: 'test.txt',
        type: 'file',
        encoding: 'utf8',
        data: 42
      }

      assert( !tv4.validate( badTextDataFile, schema ) )
    })

    it( 'bad binary data', () => {
      const badBinaryDataFile = {
        filename: 'test.bin',
        type: 'file',
        data: 42
      }

      const badBinaryArrayFile = {
        filename: 'test.bin',
        type: 'file',
        data: [ 65, 66, 256 ]
      }

      assert( !tv4.validate( badBinaryDataFile, schema ) )
      assert( !tv4.validate( badBinaryArrayFile, schema ) )
    })
  })
})
