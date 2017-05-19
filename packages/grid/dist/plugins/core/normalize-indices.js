'use strict';

var is = require('@mojule/is');

var normalizeIndices = function normalizeIndices(api, grid) {
  var normalizeColumnIndex = function normalizeColumnIndex(value) {
    if (is.integer(value) || is.undefined(value)) return value;

    var index = value;

    if (is.string(value)) {
      if (!is.null(grid.columnNames)) index = grid.columnNames.indexOf(value);

      if (is.undefined(index)) index = api.columnNameToIndex(value);

      if (is.undefined(index)) index = parseInt(value);
    }

    if (!is.integer(index)) throw new Error('Expected a column name or index');

    return index;
  };

  var normalizeRowIndex = function normalizeRowIndex(value) {
    if (is.integer(value) || is.undefined(value)) return value;

    var index = value;

    if (is.string(index)) {
      if (!is.null(grid.rowNames)) index = grid.rowNames.indexOf(index);

      if (is.undefined(index)) index = parseInt(value);
    }

    if (!is.integer(index)) throw new Error('Expected a row name or index');

    return index;
  };

  return { normalizeColumnIndex: normalizeColumnIndex, normalizeRowIndex: normalizeRowIndex };
};

module.exports = normalizeIndices;