'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var is = require('@mojule/is');
var chunk = require('lodash.chunk');

var predicate = function predicate(values) {
  return is.array(values) && is.number(values[0]);
};

var columnHeaders = function columnHeaders(values) {
  return values.slice(1, values[0] + 1);
};

var toRows = function toRows(values) {
  return chunk(values.slice(1), values[0]);
};

var fromRows = function fromRows(rows, headers) {
  var values = [headers.length].concat(_toConsumableArray(headers));

  rows.forEach(function (row) {
    return values.push.apply(values, _toConsumableArray(row));
  });

  return values;
};

module.exports = { predicate: predicate, columnHeaders: columnHeaders, toRows: toRows, fromRows: fromRows };