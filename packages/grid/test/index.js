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

const noHeaders = [
  [ '0', '1', '2' ],
  [ 'Nik', 36, true ],
  [ 'Andy', 21, true ],
  [ 'Alex', 25, false ]
]

const indices = {
  Name: 0,
  Age: 1,
  Member: 2
}

const headers = expect.rows[ 0 ]

const formatNames = Object.keys( expect )
const otherFormatNames = formatNames.slice( 1 )
const detectableFormatNames = formatNames.slice( 2 )

const { rows } = expect

describe( 'Grid', () => {
  describe( 'Grid API', () => {
    const grid = Grid( rows )

    it( 'keys', () => {
      assert.deepEqual( grid.keys(), headers )
    })

    it( 'width', () => {
      assert.deepEqual( grid.width(), headers.length )
    })

    it( 'height', () => {
      assert.deepEqual( grid.height(), rows.length - 1 )
    })

    it( 'specify headers', () => {
      const grid = Grid( rows.slice( 1 ), { columnHeaders: headers } )

      assert.deepEqual( grid.rows(), rows )
    })

    it( 'no headers', () => {
      const grid = Grid( rows.slice( 1 ), { hasColumnHeaders: false } )

      assert.deepEqual( grid.rows(), noHeaders )
    })

    it( 'column indices', () => {
      assert.deepEqual( grid.columnIndices(), indices )
    })

    it( 'get row', () => {
      assert.deepEqual( grid.getRow( 1 ), rows[ 2 ] )
    })

    it( 'get column', () => {
      const col = grid.getColumn( 1 )
      const expectCol = expect.columns[ 1 ].slice( 1 )

      assert.deepEqual( col, expectCol )
    })

    it( 'get named column', () => {
      const col = grid.getColumn( 'Age' )
      const expectCol = expect.columns[ 1 ].slice( 1 )

      assert.deepEqual( col, expectCol )
    })

    it( 'get value', () => {
      assert.deepEqual( grid.getValue( 0, 0 ), 'Nik' )
    })

    it( 'get named', () => {
      assert.deepEqual( grid.getValue( 'Name', 0 ), 'Nik' )
    })
  })

  describe( 'formats', () => {
    describe( 'predicates', () => {
      formatNames.forEach( name => {
        const isName = 'is' + capitalizeFirstLetter( name )
        const predicate = Grid[ isName ]
        const value = expect[ name ]

        it( name, () => {
          assert( predicate( value ) )
        })
      })
    })

    describe( 'columnHeaders', () => {
      formatNames.forEach( name => {
        const value = expect[ name ]
        it( name, () => {
          assert.deepEqual( Grid.columnHeaders( value, name ), headers )
        })
      })

      it( 'bad format name', () => {
        assert.throws( () =>  Grid.columnHeaders( {}, 'bad' ) )
      })
    })

    describe( 'columnHeaders autodetect', () => {
      detectableFormatNames.forEach( name => {
        const value = expect[ name ]
        it( name, () => {
          assert.deepEqual( Grid.columnHeaders( value ), headers )
        })
      })
    })

    describe( 'factory named format', () => {
      otherFormatNames.forEach( name => {
        const value = expect[ name ]
        const grid = Grid( value, { formatName: name } )

        it( name, () => {
          assert.deepEqual( grid.rows(), rows )
        })
      })

      it( 'bad format name', () => {
        assert.throws( () => Grid( {}, { formatName: 'bad' } ) )
      })
    })

    describe( 'factory autodetect type', () => {
      detectableFormatNames.forEach( name => {
        const value = expect[ name ]
        const grid = Grid( value )

        it( name, () => {
          assert.deepEqual( grid.rows(), rows )
        })
      })
    })

    describe( 'from', () => {
      otherFormatNames.forEach( name => {
        const fromName = 'from' + capitalizeFirstLetter( name )
        const converter = Grid[ fromName ]
        const value = expect[ name ]

        it( name, () => {
          assert.deepEqual( converter( value ), rows )
        })
      })
    })

    describe( 'to', () => {
      const grid = Grid( rows )

      otherFormatNames.forEach( name => {
        it( name, () => {
          assert.deepEqual( grid[ name ](), expect[ name ] )
        })
      })
    })
  })
})