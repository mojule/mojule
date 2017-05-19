'use strict'

const assert = require( 'assert' )
const utils = require( '@mojule/utils' )
const Grid = require( '../src' )

const { capitalizeFirstLetter } = utils

const expect = {
  rows: [
    [ 'Name', 'Age', 'Member' ],
    [ 'Nik', 36, true ],
    [ 'Andy', 21, true ],
    [ 'Alex', 25, false ]
  ],
  columns: [
    [ "Name", "Nik", "Andy", "Alex" ],
    [ "Age", 36, 21, 25 ],
    [ "Member", true, true, false ]
  ],
  csv: 'Name,Age,Member\nNik,36,TRUE\nAndy,21,TRUE\nAlex,25,FALSE\n',
  models: [
    {
      "Name": "Nik",
      "Age": 36,
      "Member": true
    },
    {
      "Name": "Andy",
      "Age": 21,
      "Member": true
    },
    {
      "Name": "Alex",
      "Age": 25,
      "Member": false
    }
  ],
  columnsModel: {
    "Name": [ "Nik", "Andy", "Alex" ],
    "Age": [ 36, 21, 25 ],
    "Member": [ true, true, false ]
  },
  values: [
    3,
    "Name", "Age", "Member",
    "Nik", 36, true,
    "Andy", 21, true,
    "Alex",25,false
  ]
}

const headers = expect.rows[ 0 ]

const formatNames = [ 'columnsModel', 'models', 'csv' ]

const { rows } = expect

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
      })

      it( 'columnNameToIndex', () => {
        assert.equal( columnNameToIndex( 'A' ), 0 )
        assert.equal( columnNameToIndex( 'a' ), 0 )
        assert.equal( columnNameToIndex( 'AA' ), 26 )
        assert.equal( columnNameToIndex( 'aa' ), 26 )
        assert.equal( columnNameToIndex( 1 ), undefined )
      })

      it( 'getWidth', () => {
        assert.equal( getWidth( rows ), headers.length )
      })

      it( 'getHeight', () => {
        assert.equal( getHeight( rows ), rows.length )
      })

      it( 'isRows', () => {
        assert( isRows( rows ) )
        assert( !isRows( {} ) )
      })

      it( 'getColumnFrom', () => {
        const col = getColumnFrom( rows, 1 )
        const expectCol = expect.columns[ 1 ]

        assert.deepEqual( col, expectCol )
      })

      describe( 'getColumnsFrom', () => {
        it( 'all', () => {
          const cols = getColumnsFrom( rows )

          assert.deepEqual( cols, expect.columns )
        })

        it( 'from', () => {
          const cols = getColumnsFrom( rows, 1 )

          assert.deepEqual( cols, expect.columns.slice( 1 ) )
        })

        it( 'from to', () => {
          const cols = getColumnsFrom( rows, 0, 1 )
          const expectCols = expect.columns.slice( 0, 2 )

          assert.deepEqual( cols, expectCols )
        })
      })

      it( 'getRowFrom', () => {
        const row = getRowFrom( rows, 1 )
        const expectRow = expect.rows[ 1 ]

        assert.deepEqual( row, expectRow )
      })

      describe( 'getRowsFrom', () => {
        it( 'all', () => {
          const all = getRowsFrom( rows )

          assert.deepEqual( all, expect.rows )
        })

        it( 'from', () => {
          const from = getRowsFrom( rows, 1 )

          assert.deepEqual( from, expect.rows.slice( 1 ) )
        })

        it( 'from to', () => {
          const range = getRowsFrom( rows, 0, 1 )
          const expectRows = expect.rows.slice( 0, 2 )

          assert.deepEqual( range, expectRows )
        })
      })

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
        })

        it( 'No headers', () => {
          const state = createState( rows, { hasColumnHeaders: false } )

          assert.deepEqual( state.rows, rows )
          assert.deepEqual( state.columnNames, null )
          assert.equal( state.rowNames, null )
        })

        it( 'row headers', () => {
          const state = createState( rows.slice( 1 ), { hasColumnHeaders: false, hasRowHeaders: true } )

          assert.deepEqual( state.rows, expectRowsWithRowHeaders )
          assert.deepEqual( state.columnNames, null )
          assert.deepEqual( state.rowNames, expectRowNames )
        })

        describe( 'Provide headers', () => {
          it( 'Override column headers', () => {
            const state = createState( rows, { columnNames: [ 'ID', 'Wisdom', 'Awesome' ] } )

            assert.deepEqual( state.rows, rows.slice( 1 ) )
            assert.deepEqual( state.columnNames, [ 'ID', 'Wisdom', 'Awesome' ] )
            assert.equal( state.rowNames, null )
          })

          it( 'Set column headers', () => {
            const state = createState( rows.slice( 1 ), {
              hasColumnHeaders: false,
              columnNames: [ 'ID', 'Wisdom', 'Awesome' ]
            })

            assert.deepEqual( state.rows, rows.slice( 1 ) )
            assert.deepEqual( state.columnNames, [ 'ID', 'Wisdom', 'Awesome' ] )
            assert.equal( state.rowNames, null )
          })

          it( 'Override row headers', () => {
            const state = createState( rows.slice( 1 ), {
              rowNames: [ 'John', 'Paul', 'Ringo' ],
              hasColumnHeaders: false,
              hasRowHeaders: true
            })

            assert.deepEqual( state.rows, expectRowsWithRowHeaders )
            assert.deepEqual( state.rowNames, [ 'John', 'Paul', 'Ringo' ] )
            assert.equal( state.columnNames, null )
          })

          it( 'Set row headers', () => {
            const state = createState( expectRowsWithRowHeaders, {
              rowNames: [ 'John', 'Paul', 'Ringo' ],
              hasColumnHeaders: false,
              hasRowHeaders: false
            })

            assert.deepEqual( state.rows, expectRowsWithRowHeaders )
            assert.deepEqual( state.rowNames, [ 'John', 'Paul', 'Ringo' ] )
            assert.equal( state.columnNames, null )
          })
        })
      })
    })

    describe( 'Auto column headers (default)', () =>{
      const grid = Grid( rows )

      it( 'columnNames', () => {
        assert.deepEqual( grid.columnNames(), headers )
      })

      it( 'width', () => {
        assert.equal( grid.width(), headers.length )
      })

      it( 'height', () => {
        assert.equal( grid.height(), rows.length - 1 )
      })

      it( 'specify headers', () => {
        const grid = Grid( rows, { columnNames: headers } )

        assert.deepEqual( grid.rows(), rows.slice( 1 ) )
      })

      it( 'get row', () => {
        assert.deepEqual( grid.row( 1 ), rows[ 2 ] )
      })

      it( 'get column', () => {
        const col = grid.column( 1 )
        const expectCol = expect.columns[ 1 ].slice( 1 )

        assert.deepEqual( col, expectCol )
      })

      it( 'get named column', () => {
        const col = grid.column( 'Age' )
        const expectCol = expect.columns[ 1 ].slice( 1 )

        assert.deepEqual( col, expectCol )
      })

      it( 'get column name', () => {
        assert.equal( grid.columnName( 1 ), 'Age' )
        assert.equal( grid.getColumnName( 1 ), 'Age' )
      })

      it( 'set column name', () => {
        const newGrid = Grid( rows )

        newGrid.setColumnName( 1, 'Wisdom' )

        assert.equal( grid.getColumnName( 1 ), 'Age' )
        assert.equal( newGrid.getColumnName( 1 ), 'Wisdom' )

        newGrid.columnName( 1, 'Experience' )

        assert.equal( grid.getColumnName( 1 ), 'Age' )
        assert.equal( newGrid.getColumnName( 1 ), 'Experience' )
      })

      it( 'get value', () => {
        assert.equal( grid.value( 0, 0 ), 'Nik' )
        assert.equal( grid.getValue( 0, 0 ), 'Nik' )
      })

      it( 'get named value', () => {
        assert.equal( grid.value( 'Name', 0 ), 'Nik' )
        assert.equal( grid.getValue( 'Name', 0 ), 'Nik' )
      })

      /*
      it( 'set value', () => {
        const newGrid = Grid( rows )

        newGrid.setValue( 0, 0, 'nrkn' )

        assert.equal( grid.getValue( 0, 0 ), 'Nik' )
        assert.equal( newGrid.getValue( 0, 0 ), 'nrkn' )

        newGrid.value( 0, 0, 'nrknthuk' )

        assert.equal( grid.getValue( 0, 0 ), 'Nik' )
        assert.equal( newGrid.getValue( 0, 0 ), 'nrknthuk' )
      })

      it( 'set value named', () => {
        const newGrid = Grid( rows )

        newGrid.setValue( 'Name', 0, 'nrkn' )

        assert.equal( grid.getValue( 0, 0 ), 'Nik' )
        assert.equal( newGrid.getValue( 0, 0 ), 'nrkn' )

        newGrid.value( 'Name', 0, 'nrknthuk' )

        assert.equal( grid.getValue( 0, 0 ), 'Nik' )
        assert.equal( newGrid.getValue( 0, 0 ), 'nrknthuk' )
      })
      */
    })
  })

  describe( 'formats', () => {
    describe( 'predicates', () => {
      formatNames.forEach( name => {
        it( name, () => {
          assert( Grid.isFormat( name, expect[ name ] ) )
        })
      })

      it( 'bad name', () => {
        assert.throws( () => Grid.isFormat( 'bad', expect.rows ) )
      })
    })

    describe( 'factory named format', () => {
      formatNames.forEach( name => {
        const value = expect[ name ]
        const grid = Grid( value, { format: name } )

        it( name, () => {
          assert.deepEqual( grid.columnNames(), rows[ 0 ] )
          assert.deepEqual( grid.rows(), rows.slice( 1 ) )
        })
      })

      it( 'bad format name', () => {
        assert.throws( () => Grid( {}, { format: 'bad' } ) )
      })
    })

    describe( 'factory autodetect type', () => {
      formatNames.forEach( name => {
        const grid = Grid( expect[ name ] )

        it( name, () => {
          assert.deepEqual( grid.columnNames(), rows[ 0 ] )
          assert.deepEqual( grid.rows(), rows.slice( 1 ) )
        })
      })

      it( 'unknown format', () => {
        assert.throws( () => Grid( 123 ) )
      })
    })

    describe( 'from', () => {
      formatNames.forEach( name => {
        it( name, () => {
          const state = Grid.fromFormat( name, expect[ name ] )

          assert.deepEqual( state.rows, rows.slice() )
        })
      })
    })

    describe( 'from autodetect', () => {
      formatNames.forEach( name => {
        it( name, () => {
          const state = Grid.fromFormat( expect[ name ] )

          assert.deepEqual( state.rows, rows.slice() )
        })
      })
    })

    describe( 'to', () => {
      const grid = Grid( rows )

      formatNames.forEach( name => {
        it( name, () => {
          assert.deepEqual( grid[ name ](), expect[ name ] )
        })
      })
    })
  })
})