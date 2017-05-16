'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var is = require('@mojule/is');
var utils = require('@mojule/utils');
var formats = require('./formats');

var capitalizeFirstLetter = utils.capitalizeFirstLetter;


var formatKeys = Object.keys(formats);
var otherFormatKeys = formatKeys.slice(1);

var predicates = formatKeys.reduce(function (preds, key) {
  var name = 'is' + capitalizeFirstLetter(key);

  preds[name] = formats[key].predicate;

  return preds;
}, {});

var from = otherFormatKeys.reduce(function (fr, key) {
  var name = 'from' + capitalizeFirstLetter(key);
  var converter = formats[key].toRows;

  fr[name] = converter;

  return fr;
}, {});

var isRows = predicates.isRows;


var defaultOptions = {
  hasColumnHeaders: true,
  columnHeaders: null,
  formatName: null
};

var Grid = function Grid() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  options = Object.assign({}, defaultOptions, options);

  var _options = options,
      hasColumnHeaders = _options.hasColumnHeaders,
      columnHeaders = _options.columnHeaders,
      formatName = _options.formatName;


  if (is.array(columnHeaders)) hasColumnHeaders = false;

  if (!is.string(formatName)) formatName = formatKeys.find(function (key) {
    return formats[key].predicate(data);
  });

  if (formatName !== 'rows') {
    var format = formats[formatName];

    if (is.undefined(format)) throw new Error('Unexpected input format');

    data = format.toRows(data);
  }

  var columnKeys = [];

  var width = function width() {
    return data.reduce(function (max, row) {
      return row.length > max ? row.length : max;
    }, 0);
  };

  var rows = function rows() {
    return [columnKeys].concat(_toConsumableArray(data));
  };
  var height = function height() {
    return data.length;
  };

  if (hasColumnHeaders) {
    columnKeys.push.apply(columnKeys, _toConsumableArray(data[0]));
    data = data.slice(1);
  } else {
    if (Array.isArray(columnHeaders)) {
      columnKeys.push.apply(columnKeys, _toConsumableArray(columnHeaders));
    } else {
      var arr = new Array(width());
      var keys = arr.keys();
      columnKeys.push.apply(columnKeys, _toConsumableArray(keys));
    }
  }

  var columnIndices = function columnIndices() {
    return columnKeys.reduce(function (obj, key, i) {
      obj[key] = i;

      return obj;
    }, {});
  };

  var getRow = function getRow() {
    var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return data[y];
  };

  var getColumn = function getColumn() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    if (is.string(x)) x = columnIndices()[x];

    var column = data.reduce(function (col, row) {
      col.push(row[x]);
      return col;
    }, []);

    return column;
  };

  var getValue = function getValue() {
    var column = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (is.string(column)) column = columnIndices()[column];

    return data[row][column];
  };

  var to = otherFormatKeys.reduce(function (t, key) {
    var converter = formats[key].fromRows;

    t[key] = function () {
      return converter(data, columnKeys);
    };

    return t;
  }, {});

  var grid = {
    keys: function keys() {
      return columnKeys;
    },
    width: width, height: height, rows: rows, columnIndices: columnIndices, getColumn: getColumn, getRow: getRow, getValue: getValue
  };

  Object.assign(grid, to);

  return grid;
};

var columnHeaders = function columnHeaders(data, formatName) {
  if (is.undefined(formatName)) {
    formatName = formatKeys.find(function (key) {
      return formats[key].predicate(data);
    });
  }

  var format = formats[formatName];

  if (is.undefined(format)) throw new Error('Could not find a matching format');

  return format.columnHeaders(data);
};

Object.assign(Grid, predicates, from, { columnHeaders: columnHeaders });

module.exports = Grid;