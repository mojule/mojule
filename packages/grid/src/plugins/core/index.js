'use strict'

const core = ( api, grid ) => {
  const width = () => api.getWidth( grid.rows )
  const height = () => api.getHeight( grid.rows )

  const getRowsWithHeaders = () => {
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

  return {
    width, height, getRowsWithHeaders
  }
}

module.exports = core
