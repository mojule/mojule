# grid

API for working with grid or grid-like data.

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

## Options

```javascript
const defaultOptions = {
  hasColumnHeaders: true,
  hasRowHeaders: false,
  columnNames: null,
  rowNames: null
}
```


## API Reference

### Static API

#### columnIndexToName

Columns may be addressed by integer index, letter (i.e. 'A', 'B',...) or by name

```JSON
{
  "Grid": [
    "columnIndexToName",
    "columnNameToIndex",
    "createState",
    "formatFor",
    "formatNames",
    "fromFormat",
    "getColumnFrom",
    "getColumnsFrom",
    "getFormat",
    "getHeight",
    "getRowFrom",
    "getRowsFrom",
    "getStateKey",
    "getWidth",
    "isFormat",
    "isRows",
    "isState",
    "onCreate"
    "Factory"
  ],
  "grid": [
    "column",
    "columnIndexToName",
    "columnName",
    "columnNameToIndex",
    "columnNames",
    "columns",
    "columnsModel",
    "createState",
    "csv",
    "formatFor",
    "formatNames",
    "fromFormat",
    "getColumn",
    "getColumnFrom",
    "getColumnName",
    "getColumnNames",
    "getColumns",
    "getColumnsFrom",
    "getFormat",
    "getHeight",
    "getRow",
    "getRowFrom",
    "getRowName",
    "getRowNames",
    "getRows",
    "getRowsFrom",
    "getRowsWithHeaders",
    "getValue",
    "getValues",
    "getWidth",
    "hasColumnNames",
    "hasRowNames",
    "height",
    "isFormat",
    "isRows",
    "models",
    "normalizeColumnIndex",
    "normalizeRowIndex",
    "row",
    "rowName",
    "rowNames",
    "rows",
    "schema",
    "setColumn",
    "setColumnName",
    "setColumnNames",
    "setColumns",
    "setRow",
    "setRowName",
    "setRowNames",
    "setRows",
    "setValue",
    "setValues",
    "value",
    "values",
    "width"
  ]}
```

##
