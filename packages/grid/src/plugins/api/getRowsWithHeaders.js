'use strict'

const getRowsWithHeaders = ({ api, state, Api }) => {
  api.getRowsWithHeaders = () => {
    const hasColumnHeaders = api.hasColumnNames()
    const hasRowHeaders = api.hasRowNames()

    let rows = api.rows()

    if( hasColumnHeaders ){
      const headers = api.columnNames()
      rows = [ headers, ...rows ]
    }

    if( hasRowHeaders ){
      const headers = api.rowNames()
      const y = hasColumnHeaders ? 1 : 0

      rows = rows.map( ( row, i ) => {
        if( hasColumnHeaders && i === 0 )
          return [ '', ...row ]

        return [ headers[ i - y ], ...row ]
      })
    }

    return rows
  }
}

module.exports = getRowsWithHeaders
