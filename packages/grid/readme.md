# grid

API for working with grid or grid-like data

Work in progress, documentation to come

## Install

`npm install @mojule/grid`

## Example

```javascript
const Grid = require( '@mojule/grid' )

const data = [
  [ 'Name', 'Age', 'Member' ],
  [ 'Nik', 36, true ],
  [ 'Andy', 21, true ],
  [ 'Alex', 25, false ]
]

const grid = Grid( data )

console.log( JSON.stringify( grid.models(), null, 2 ) )
```

```JSON
[
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
]
```

## API

```JSON
{
  "Grid": [
    "columnIndexToName",
    "columnNameToIndex",
    "getWidth",
    "getHeight",
    "isRows",
    "getColumnFrom",
    "getColumnsFrom",
    "getRowFrom",
    "getRowsFrom",
    "createState",
    "getFormat",
    "isFormat",
    "formatFor",
    "fromFormat",
    "formatNames",
    "isState",
    "getStateKey",
    "onCreate",
    "Factory"
  ],
  "grid": [
    "normalizeColumnIndex",
    "normalizeRowIndex",
    "getColumn",
    "setColumn",
    "column",
    "getColumns",
    "setColumns",
    "columns",
    "getRow",
    "setRow",
    "row",
    "getRows",
    "setRows",
    "rows",
    "getColumnName",
    "setColumnName",
    "columnName",
    "hasColumnNames",
    "getColumnNames",
    "setColumnNames",
    "columnNames",
    "getRowName",
    "setRowName",
    "rowName",
    "hasRowNames",
    "getRowNames",
    "setRowNames",
    "rowNames",
    "getValue",
    "setValue",
    "value",
    "getValues",
    "setValues",
    "values",
    "width",
    "height",
    "getRowsWithHeaders",
    "schema",
    "models",
    "columnsModel",
    "csv"
  ]
}
```