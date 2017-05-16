'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var is = require('@mojule/is');

var predicate = function predicate(columns) {
  return is.array(columns) && columns.every(is.array);
};

var columnHeaders = function columnHeaders(columns) {
  return columns.map(function (col) {
    return col[0];
  });
};

var toRows = function toRows(columns) {
  var height = columns.reduce(function (max, col) {
    return col.length > max ? col.length : max;
  }, 0);

  var rows = new Array(height);

  for (var y = 0; y < height; y++) {
    rows[y] = [];
  }columns.forEach(function (col, x) {
    col.forEach(function (value, y) {
      rows[y][x] = value;
    });
  });

  return rows;
};

var fromRows = function fromRows(rows, headers) {
  rows = [headers].concat(_toConsumableArray(rows));

  var width = rows.reduce(function (max, row) {
    return row.length > max ? row.length : max;
  }, 0);

  var cols = new Array(width);

  for (var x = 0; x < width; x++) {
    cols[x] = [];
  }rows.forEach(function (row, y) {
    row.forEach(function (value, x) {
      cols[x][y] = value;
    });
  });

  return cols;
};

module.exports = { predicate: predicate, columnHeaders: columnHeaders, toRows: toRows, fromRows: fromRows };