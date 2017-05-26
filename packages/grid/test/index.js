'use strict'
/// <reference path="../typings/index.d.ts"/>

const assert = require( 'assert' )
const is = require( '@mojule/is' )
const Grid = require( '../src' )


const expect = {
  rows: [
    [ 'Name', 'Age', 'Member' ],
    [ 'Nik', 36, true ],
    [ 'Andy', 21, true ],
    [ 'Alex', 25, false ]
  ],
  columns: [
    [ 'Name', 'Nik', 'Andy', 'Alex' ],
    [ 'Age', 36, 21, 25 ],
    [ 'Member', true, true, false ]
  ],
  csv: 'Name,Age,Member\nNik,36,TRUE\nAndy,21,TRUE\nAlex,25,FALSE\n',
  models: [
    {
      'Name': 'Nik',
      'Age': 36,
      'Member': true
    },
    {
      'Name': 'Andy',
      'Age': 21,
      'Member': true
    },
    {
      'Name': 'Alex',
      'Age': 25,
      'Member': false
    }
  ],
  columnsModel: {
    'Name': [ 'Nik', 'Andy', 'Alex' ],
    'Age': [ 36, 21, 25 ],
    'Member': [ true, true, false ]
  },
  values: [
    3,
    'Name', 'Age', 'Member',
    'Nik', 36, true,
    'Andy', 21, true,
    'Alex', 25, false
  ]
}

const headers = expect.rows[ 0 ]

const formatNames = [ 'columnsModel', 'models', 'csv' ]

const { rows, columns } = expect

describe( 'Grid', () => {
  describe( 'Grid API', () => {
    describe( 'statics', () => {
      const {
        columnIndexToName,
        columnNameToIndex,
        getWidth,
        getHeight,
        isRows,
        getColumnFrom,
        getColumnsFrom,
        getRowFrom,
        getRowsFrom,
        createState,
        getFormat,
        isFormat,
        formatFor,
        fromFormat,
        formatNames
      } = Grid

      it( 'columnIndexToName', () => {
        assert.equal( columnIndexToName( 0 ), 'A' )
        assert.equal( columnIndexToName( 26 ), 'AA' )
      } )

      it( 'columnNameToIndex', () => {
        assert.equal( columnNameToIndex( 'A' ), 0 )
        assert.equal( columnNameToIndex( 'a' ), 0 )
        assert.equal( columnNameToIndex( 'AA' ), 26 )
        assert.equal( columnNameToIndex( 'aa' ), 26 )
        assert.equal( columnNameToIndex( 1 ), undefined )
      } )

      it( 'getWidth', () => {
        assert.equal( getWidth( rows ), headers.length )
      } )

      it( 'getHeight', () => {
        assert.equal( getHeight( rows ), rows.length )
      } )

      it( 'isRows', () => {
        assert( isRows( rows ) )
        assert( !isRows( {} ) )
      } )

      it( 'getColumnFrom', () => {
        const col = getColumnFrom( rows, 1 )
        const expectCol = expect.columns[ 1 ]

        assert.deepEqual( col, expectCol )
      } )

      describe( 'getColumnsFrom', () => {
        it( 'all', () => {
          const cols = getColumnsFrom( rows )

          assert.deepEqual( cols, expect.columns )
        } )

        it( 'from', () => {
          const cols = getColumnsFrom( rows, 1 )

          assert.deepEqual( cols, expect.columns.slice( 1 ) )
        } )

        it( 'from to', () => {
          const cols = getColumnsFrom( rows, 0, 1 )
          const expectCols = expect.columns.slice( 0, 2 )

          assert.deepEqual( cols, expectCols )
        } )
      } )

      it( 'getRowFrom', () => {
        const row = getRowFrom( rows, 1 )
        const expectRow = expect.rows[ 1 ]

        assert.deepEqual( row, expectRow )
      } )

      describe( 'getRowsFrom', () => {
        it( 'all', () => {
          const all = getRowsFrom( rows )

          assert.deepEqual( all, expect.rows )
        } )

        it( 'from', () => {
          const from = getRowsFrom( rows, 1 )

          assert.deepEqual( from, expect.rows.slice( 1 ) )
        } )

        it( 'from to', () => {
          const range = getRowsFrom( rows, 0, 1 )
          const expectRows = expect.rows.slice( 0, 2 )

          assert.deepEqual( range, expectRows )
        } )
      } )

      describe( 'formats', () => {
        const defaultFormats = [ 'models', 'columnsModel', 'csv' ]
        const csvData = 'a,b,c\n1,2,3'
        const csvRows = [['a','b','c'],[1,2,3]]
        it( 'gets format names', () => {
          const names = formatNames()
          assert.deepEqual( names, defaultFormats )
        } )
        it( 'gets named format', () => {
          const format = getFormat(defaultFormats[2])
          assert( format !== undefined )
        } )
        it( 'tests data is named format', () => {
          const isCsv = isFormat(defaultFormats[2], csvData )
          assert( isCsv )
        } )
        it( 'returns format name for data', () => {
          let formatName = formatFor( csvData)
          assert.equal( formatName, defaultFormats[2]  )
          formatName = formatFor( null)
          assert.equal( formatName, undefined  )
        } )
        it( 'returns rows from data', () => {
          const rows = fromFormat( csvData ).rows
          assert.deepEqual( rows, csvRows  )
        } )

      } )

      describe( 'createState', () => {
        const expectRowNames = [ 'Nik', 'Andy', 'Alex' ]
        const expectRowsWithRowHeaders = [
          [ 36, true ],
          [ 21, true ],
          [ 25, false ]
        ]

        it( 'Auto column headers (default)', () => {
          const state = createState( rows )
          assert.deepEqual( state.rows, rows.slice( 1 ) )
          assert.deepEqual( state.columnNames, headers )
          assert.equal( state.rowNames, null )
        } )

        it( 'No headers', () => {
          const state = createState( rows, { hasColumnHeaders: false } )

          assert.deepEqual( state.rows, rows )
          assert.deepEqual( state.columnNames, null )
          assert.equal( state.rowNames, null )
        } )

        it( 'row headers', () => {
          const state = createState( rows.slice( 1 ), { hasColumnHeaders: false, hasRowHeaders: true } )

          assert.deepEqual( state.rows, expectRowsWithRowHeaders )
          assert.deepEqual( state.columnNames, null )
          assert.deepEqual( state.rowNames, expectRowNames )
        } )

        describe( 'Provide headers', () => {
          it( 'Override column headers', () => {
            const state = createState( rows, { columnNames: [ 'ID', 'Wisdom', 'Awesome' ] } )

            assert.deepEqual( state.rows, rows.slice( 1 ) )
            assert.deepEqual( state.columnNames, [ 'ID', 'Wisdom', 'Awesome' ] )
            assert.equal( state.rowNames, null )
          } )

          it( 'Set column headers', () => {
            const state = createState( rows.slice( 1 ), {
              hasColumnHeaders: false,
              columnNames: [ 'ID', 'Wisdom', 'Awesome' ]
            } )

            assert.deepEqual( state.rows, rows.slice( 1 ) )
            assert.deepEqual( state.columnNames, [ 'ID', 'Wisdom', 'Awesome' ] )
            assert.equal( state.rowNames, null )
          } )

          it( 'Override row headers', () => {
            const state = createState( rows.slice( 1 ), {
              rowNames: [ 'John', 'Paul', 'Ringo' ],
              hasColumnHeaders: false,
              hasRowHeaders: true
            } )

            assert.deepEqual( state.rows, expectRowsWithRowHeaders )
            assert.deepEqual( state.rowNames, [ 'John', 'Paul', 'Ringo' ] )
            assert.equal( state.columnNames, null )
          } )

          it( 'Set row headers', () => {
            const state = createState( expectRowsWithRowHeaders, {
              rowNames: [ 'John', 'Paul', 'Ringo' ],
              hasColumnHeaders: false,
              hasRowHeaders: false
            } )

            assert.deepEqual( state.rows, expectRowsWithRowHeaders )
            assert.deepEqual( state.rowNames, [ 'John', 'Paul', 'Ringo' ] )
            assert.equal( state.columnNames, null )
          } )
        } )
      } )
    } )

    describe( 'Auto column headers (default)', () => {
      const grid = Grid( rows )

      it( 'columnNames', () => {
        assert.deepEqual( grid.columnNames(), headers )
      } )

      it( 'width', () => {
        assert.equal( grid.width(), headers.length )
      } )

      it( 'height', () => {
        assert.equal( grid.height(), rows.length - 1 )
      } )

      it( 'specify headers', () => {
        const grid = Grid( rows, { columnNames: headers } )

        assert.deepEqual( grid.rows(), rows.slice( 1 ) )
      } )

      it( 'get row', () => {
        assert.deepEqual( grid.row( 1 ), rows[ 2 ] )
      } )

      it( 'get column', () => {
        const col = grid.column( 1 )
        const expectCol = expect.columns[ 1 ].slice( 1 )

        assert.deepEqual( col, expectCol )
      } )

      it( 'get named column', () => {
        const col = grid.column( 'Age' )
        const expectCol = expect.columns[ 1 ].slice( 1 )

        assert.deepEqual( col, expectCol )
      } )

      it( 'get column name', () => {
        assert.equal( grid.columnName( 1 ), 'Age' )
        assert.equal( grid.getColumnName( 1 ), 'Age' )
      } )

      it( 'set column', () => {
        const newCol = [ 'John', 'Paul', 'Ringo' ]
        const newGrid = Grid( rows )
        newGrid.column( newCol )
        assert.deepEqual( newGrid.getColumn( 0 ), newCol )
      } )

      it( 'set columns', () => {
        const newCols = [ [ 'John', 'Paul', 'Ringo' ], [ 11, 12, 13 ] ]
        const newGrid = Grid( rows )
        newGrid.columns( newCols )
        assert.deepEqual( newGrid.getColumns( 0, 1 ), newCols )
      } )

      it( 'set row', () => {
        const newRow = [ 'Tom', 41, false ]
        const newGrid = Grid( rows )
        newGrid.row( newRow )
        assert.deepEqual( newGrid.getRow( 0 ), newRow )
      } )

      it( 'set rows', () => {
        const newRows = [ [ 'Tom', 41, false ], [ 'Dick', 42, true ] ]
        const newGrid = Grid( rows )
        newGrid.rows( newRows )
        assert.deepEqual( newGrid.getRow( 0 ), newRows[ 0 ] )
        assert.deepEqual( newGrid.getRow( 1 ), newRows[ 1 ] )
      } )

      it( 'set column name', () => {
        const newGrid = Grid( rows )

        newGrid.setColumnName( 1, 'Wisdom' )

        assert.equal( grid.getColumnName( 1 ), 'Age' )
        assert.equal( newGrid.getColumnName( 1 ), 'Wisdom' )

        newGrid.columnName( 1, 'Experience' )

        assert.equal( grid.getColumnName( 1 ), 'Age' )
        assert.equal( newGrid.getColumnName( 1 ), 'Experience' )

        assert.throws(() => newGrid.setColumnName( undefined, 'bad' ) )
        assert.throws(() => newGrid.setColumnName( 2, false ) )

      } )

      it( 'get value', () => {
        assert.equal( grid.value( 0, 0 ), 'Nik' )
        assert.equal( grid.getValue( 0, 0 ), 'Nik' )
      } )

      it( 'get values', () => {
        const values = grid.values()
        assert.equal( values.length, 9 )
        assert.equal( values[ 0 ], 'Nik' )
      } )

      it( 'get named value', () => {
        assert.equal( grid.value( 'Name', 0 ), 'Nik' )
        assert.equal( grid.getValue( 'Name', 0 ), 'Nik' )
      } )

      it( 'set value', () => {
        const newGrid = Grid( rows )

        newGrid.setValue( 0, 0, 'nrkn' )

        assert.equal( grid.getValue( 0, 0 ), 'Nik' )
        assert.equal( newGrid.getValue( 0, 0 ), 'nrkn' )

        newGrid.value( 0, 0, 'nrknthuk' )

        assert.equal( grid.getValue( 0, 0 ), 'Nik' )
        assert.equal( newGrid.getValue( 0, 0 ), 'nrknthuk' )
      } )

      it( 'set values', () => {
        const newGrid = Grid( rows )
        const newValues = [ 'Tom', 21, false ]
        newGrid.values( newValues )
        assert.deepEqual( newGrid.getValues(), newValues )
      } )


      it( 'set value named', () => {
        const newGrid = Grid( rows )

        newGrid.setValue( 'Name', 0, 'nrkn' )

        assert.equal( grid.getValue( 0, 0 ), 'Nik' )
        assert.equal( newGrid.getValue( 0, 0 ), 'nrkn' )

        newGrid.value( 'Name', 0, 'nrknthuk' )

        assert.equal( grid.getValue( 0, 0 ), 'Nik' )
        assert.equal( newGrid.getValue( 0, 0 ), 'nrknthuk' )
      } )
    } )

    describe( 'schema tests', () => {
      const newGrid = Grid( rows )
      newGrid.setValue( 0, 0, undefined )
      newGrid.setValue( 1, 1, 21.5 )
      newGrid.setValue( 2, 1, 'unexpected' )
      it( 'schema', () => {
        const expectSchema = {
          'properties': {
            'Name': {
              'type': 'string'
            },
            'Age': {
              'type': 'number'
            },
            'Member': {
              'type': 'any'
            }
          },
          'required': [
            'Age',
            'Member'
          ]
        }
        const schema = newGrid.schema()
        assert.deepEqual( schema, expectSchema )
      } )
    } )


    describe( 'Data has no headers', () => {
      const newGrid = Grid( rows, {
        hasColumnHeaders: false
      } )
      it( 'tests invalid index options', () => {
        assert.throws(() => newGrid.getColumn( '$' ) )
        assert.throws(() => newGrid.getRow( '$' ) )
      } )
      it( 'tests valid index options', () => {
        const firstColumn = newGrid.getColumn( 'A' )
        assert.equal( firstColumn[ 0 ], 'Name' )
        const firstRow = newGrid.getRow( '0' )
        assert.equal( firstRow[ 0 ], 'Name' )
      } )
      it( 'gets default column names', () => {
        assert.equal( newGrid.getColumnName( 1 ), 'B' )
        assert.deepEqual( newGrid.getColumnNames(), [ 'A', 'B', 'C' ] )
      } )
      it( 'gets default row names', () => {
        assert.equal( newGrid.getRowName( 1 ), '1' )
        assert.deepEqual( newGrid.getRowNames(), [ '0', '1', '2', '3' ] )
      } )
      it( 'sets column name', () => {
        assert.equal( newGrid.columnName( 1, 'Barry' ), 'Barry' )
        assert.equal( newGrid.columnName( 1 ), 'Barry' )
      } )
    } )

    describe( 'Test index options', () => {
      const newGrid = Grid( rows, {
        hasColumnHeaders: false
      } )
      it( 'invalid index options', () => {
        assert.throws(() => newGrid.getColumn( '$' ) )
        assert.throws(() => newGrid.getRow( '$' ) )
        assert.throws(() => newGrid.getColumn( null ) )
        assert.throws(() => newGrid.getRow( null ) )
      } )
      it( 'valid string index options', () => {
        const firstColumn = newGrid.getColumn( 'A' )
        assert.equal( firstColumn[ 0 ], 'Name' )
        const firstRow = newGrid.getRow( '0' )
        assert.equal( firstRow[ 0 ], 'Name' )
      } )
    } )

    describe( 'Data has row headers but not column headers', () => {
      const newGrid = Grid( columns, {
        hasColumnHeaders: false,
        hasRowHeaders: true
      } )
      assert( newGrid.getRowName( 1 ), 'Age' )
      assert.deepEqual( newGrid.getRowNames(), [ 'Name', 'Age', 'Member' ] )
      const rowsWithHeaders = newGrid.getRowsWithHeaders()
      assert.equal( rowsWithHeaders.length, 3 )
    } )

    describe( 'Data has both column and row headers', () => {
      const newGrid = Grid( rows, {
        hasColumnHeaders: true,
        hasRowHeaders: true
      } )
      it( 'tests valid index options', () => {
        let firstColumn = newGrid.getColumn( 'Age' )
        assert.equal( firstColumn[ 0 ], 36 )
        firstColumn = newGrid.getColumn( 'A' )
        assert.equal( firstColumn[ 0 ], 36 )
        const firstRow = newGrid.getRow( '0' )
        assert.equal( firstRow[ 0 ], 36 )
      } )
      it( 'tests row headers', () => {
        const rowsWithHeaders = newGrid.getRowsWithHeaders()
        assert.equal( rowsWithHeaders.length, 4 )
      } )
    } )

    describe( 'Column headers in data, but replace from options', () => {
      const newGrid = Grid( rows )
      const newColNames = [ 'Tom', 'Dick', 'Harry' ]
      assert.deepEqual( newGrid.columnNames( newColNames ), newColNames )
      assert.deepEqual( newGrid.columnNames(), newColNames )
    } )

    describe( 'Row headers in data, but replace from options', () => {
      const newGrid = Grid( columns, {
        hasColumnHeaders: false,
        hasRowHeaders: true
      } )
      // const x = newGrid.setRowName( 'Age', 'Score' )
      // const y = newGrid.getRowName( 1 )
      assert( newGrid.setRowName( 'Age', 'Score' ), 'Score' )
      assert( newGrid.getRowName( 1 ), 'Score' )

      assert.throws(() => newGrid.setRowName( undefined, 'bad' ) )
      assert.throws(() => newGrid.setRowName( 2, false ) )

    } )

    describe( 'No column headers in data, but set with options', () => {

    } )

    describe( 'No row headers in data, but set with options', () => {
      const newGrid = Grid( rows )
      assert.equal( newGrid.rowName( 1, 'Barry' ), 'Barry' )
      assert.equal( newGrid.rowName( 1 ), 'Barry' )
      const newRowNames = [ 'Tom', 'Dick', 'Harry' ]
      assert.deepEqual( newGrid.rowNames( newRowNames ), newRowNames )
      assert.deepEqual( newGrid.rowNames(), newRowNames )
    } )
  } )

  describe( 'Factory', () => {
    const { Factory } = Grid

    const size = ( api, grid ) => {
      return {
        size: () => api.width() * api.height()
      }
    }

    it( 'options', () => {
      const Grid = Factory( { exposeState: true } )
      const grid = Grid( rows )

      assert.deepEqual( grid.state, { rows: rows.slice( 1 ), columnNames: headers, rowNames: null } )
    } )

    it( 'plugins', () => {
      const Grid = Factory( size )
      const grid = Grid( rows )

      assert.equal( grid.size(), 9 )
    } )

    it( 'plugins array', () => {
      const Grid = Factory( [ size ] )
      const grid = Grid( rows )

      assert.equal( grid.size(), 9 )
    } )

    it( 'bad plugins', () => {
      assert.throws(() => Factory( 'abc' ) )
    } )

    it( 'formats', () => {
      const Grid = Factory( {
        formats: {
          size: {
            predicate: size =>
              is.object( size ) && is.number( size.width ) &&
              is.number( size.height ),
            toStateArgs: ( size, options ) => {
              const { width, height } = size

              const rows = new Array( height )

              for( let y = 0; y < height; y++ ) {
                rows[ y ] = new Array( width )
              }

              return { rows, options }
            },
            fromGrid: api => ( {
              width: api.width(),
              height: api.height()
            } )
          }
        }
      } )

      const grid = Grid( { width: 4, height: 3 }, { hasColumnHeaders: false } )

      assert.equal( grid.width(), 4 )
      assert.equal( grid.height(), 3 )
      assert.deepEqual( grid.size(), { width: 4, height: 3 } )
    } )
  } )

  describe( 'formats', () => {
    describe( 'predicates', () => {
      formatNames.forEach( name => {
        it( name, () => {
          assert( Grid.isFormat( name, expect[ name ] ) )
        } )
      } )

      it( 'bad name', () => {
        assert.throws(() => Grid.isFormat( 'bad', expect.rows ) )
      } )
    } )

    describe( 'factory named format', () => {
      formatNames.forEach( name => {
        const value = expect[ name ]
        const grid = Grid( value, { format: name } )

        it( name, () => {
          assert.deepEqual( grid.columnNames(), rows[ 0 ] )
          assert.deepEqual( grid.rows(), rows.slice( 1 ) )
        } )
      } )

      it( 'bad format name', () => {
        assert.throws(() => Grid( {}, { format: 'bad' } ) )
      } )
    } )

    describe( 'factory autodetect type', () => {
      formatNames.forEach( name => {
        const grid = Grid( expect[ name ] )

        it( name, () => {
          assert.deepEqual( grid.columnNames(), rows[ 0 ] )
          assert.deepEqual( grid.rows(), rows.slice( 1 ) )
        } )
      } )

      it( 'unknown format', () => {
        assert.throws(() => Grid( 123 ) )
      } )
    } )

    describe( 'from', () => {
      formatNames.forEach( name => {
        it( name, () => {
          const state = Grid.fromFormat( name, expect[ name ] )

          assert.deepEqual( state.rows, rows.slice() )
        } )
      } )
    } )

    describe( 'from autodetect', () => {
      formatNames.forEach( name => {
        it( name, () => {
          const state = Grid.fromFormat( expect[ name ] )

          assert.deepEqual( state.rows, rows.slice() )
        } )
      } )
    } )

    describe( 'to', () => {
      const grid = Grid( rows )

      formatNames.forEach( name => {
        it( name, () => {
          assert.deepEqual( grid[ name ](), expect[ name ] )
        } )
      } )
    } )
  } )
} )