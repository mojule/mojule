'use strict';

var is = require('@mojule/is');

var $isRows = function $isRows(rows) {
  return is.array(rows) && rows.every(is.array);
};

var $columnIndexToName = function $columnIndexToName(index) {
  var name = '';

  while (index >= 0) {
    name = String.fromCharCode(index % 26 + 65) + name;
    index = ~~(index / 26) - 1;
  }

  return name;
};

var columnNamePattern = /[A-Z]+/;

var $columnNameToIndex = function $columnNameToIndex(name) {
  if (!columnNamePattern.test(name)) {
    if (is.string(name)) name = name.toUpperCase();

    if (!columnNamePattern.test(name)) return;
  }

  var _name = name,
      length = _name.length;

  var index = 0;

  for (var i = 0; i < length; i++) {
    index += Math.pow(26, length - i - 1) * (name.charCodeAt(i) - 64);
  }return index - 1;
};

var $getWidth = function $getWidth(rows) {
  return rows.reduce(function (max, row) {
    return row.length > max ? row.length : max;
  }, 0);
};

var $getHeight = function $getHeight(rows) {
  return rows.length;
};

var defaultOptions = {
  hasColumnHeaders: true,
  hasRowHeaders: false,
  columnNames: null,
  rowNames: null
};

var statics = function statics(api) {
  var $getColumnFrom = function $getColumnFrom(rows) {
    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var startY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var endY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : api.getHeight(rows) - 1;

    var column = [];

    for (var y = startY; y <= endY; y++) {
      var row = rows[y];
      column.push(row[x]);
    }

    return column;
  };

  var $getColumnsFrom = function $getColumnsFrom(rows) {
    var startX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var endX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : api.getWidth(rows) - 1;
    var startY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var endY = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : api.getHeight(rows) - 1;

    var columns = [];

    for (var x = startX; x <= endX; x++) {
      columns.push(api.getColumnFrom(rows, x, startY, endY));
    }

    return columns;
  };

  var $getRowFrom = function $getRowFrom(rows) {
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var startX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var endX = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : api.getWidth(rows) - 1;

    return rows[y].slice(startX, endX + 1);
  };

  var $getRowsFrom = function $getRowsFrom(rows) {
    var startY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var endY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : api.getHeight(rows) - 1;
    var startX = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var endX = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : api.getWidth(rows) - 1;

    var result = [];

    for (var y = startY; y <= endY; y++) {
      result.push(api.getRowFrom(rows, y, startX, endX));
    }

    return result;
  };

  var $createState = function $createState(rows) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    options = Object.assign({}, defaultOptions, options);

    var _options = options,
        hasColumnHeaders = _options.hasColumnHeaders,
        hasRowHeaders = _options.hasRowHeaders,
        format = _options.format;


    if (is.string(format)) {
      var args = api.fromFormat(format, rows, options);

      delete args.options.format;

      return api.createState(args.rows, args.options);
    }

    if (!$isRows(rows)) {
      var _format = api.formatFor(rows);

      if (is.undefined(_format)) throw new Error('Expected rows or a known format');

      var _args = api.fromFormat(_format, rows, options);

      return api.createState(_args.rows, _args.options);
    }

    var _options2 = options,
        columnNames = _options2.columnNames,
        rowNames = _options2.rowNames;


    var x = hasRowHeaders ? 1 : 0;
    var y = hasColumnHeaders ? 1 : 0;
    var endY = api.getHeight(rows) - 1;

    if (hasColumnHeaders && is.null(columnNames)) columnNames = api.getRowFrom(rows, 0, x);

    if (hasRowHeaders && is.null(rowNames)) rowNames = api.getColumnFrom(rows, 0, y);

    rows = api.getRowsFrom(rows, y, endY, x);

    return { rows: rows, columnNames: columnNames, rowNames: rowNames };
  };

  return {
    $columnIndexToName: $columnIndexToName,
    $columnNameToIndex: $columnNameToIndex,
    $getWidth: $getWidth,
    $getHeight: $getHeight,
    $isRows: $isRows,
    $getColumnFrom: $getColumnFrom,
    $getColumnsFrom: $getColumnsFrom,
    $getRowFrom: $getRowFrom,
    $getRowsFrom: $getRowsFrom,
    $createState: $createState
  };
};

module.exports = statics;