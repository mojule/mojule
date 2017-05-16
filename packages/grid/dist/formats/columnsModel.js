'use strict';

var is = require('@mojule/is');
var columns = require('./columns');

var rowsToColumns = columns.fromRows;

var predicate = function predicate(columnsModel) {
  return is.object(columnsModel) && Object.keys(columnsModel).every(function (key) {
    return is.array(columnsModel[key]);
  });
};

var columnHeaders = function columnHeaders(columnsModel) {
  return Object.keys(columnsModel);
};

var toRows = function toRows(columnsModel) {
  var headers = columnHeaders(columnsModel);

  var height = headers.reduce(function (max, key) {
    return columnsModel[key].length > max ? columnsModel[key].length : max;
  }, 0);

  var rows = [headers];

  var getRow = function getRow(y) {
    return headers.reduce(function (row, key) {
      row.push(columnsModel[key][y]);

      return row;
    }, []);
  };

  for (var y = 0; y < height; y++) {
    rows.push(getRow(y));
  }return rows;
};

var fromRows = function fromRows(rows, headers) {
  var columns = rowsToColumns(rows, headers);

  return columns.reduce(function (obj, col, x) {
    obj[headers[x]] = col.slice(1);

    return obj;
  }, {});
};

module.exports = { predicate: predicate, columnHeaders: columnHeaders, toRows: toRows, fromRows: fromRows };