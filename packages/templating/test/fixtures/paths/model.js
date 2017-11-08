'use strict'

const model = {
  eachField: [
    'foo', 'bar', 'baz'
  ],
  eachField2: [
    {
      firstName: 'Nik',
      lastName: 'Coughlin'
    },
    {
      firstName: 'Bob',
      lastName: 'McBobface'
    }
  ],
  nestedField: [
    [ [ 'A', 0 ], [ 'A', 1 ], [ 'A', 2 ] ],
    [ [ 'B', 0 ], [ 'B', 1 ], [ 'B', 2 ] ],
    [ [ 'C', 0 ], [ 'C', 1 ], [ 'C', 2 ] ]
  ],
  firstName: 'Jane'
}

module.exports = model