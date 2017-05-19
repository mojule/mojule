'use strict';

var is = require('@mojule/is');

var rowName = function rowName(api, grid) {
  var getRowName = function getRowName(i) {
    if (is.null(grid.rowNames)) return i.toString();

    return grid.rowNames[i];
  };

  var setRowName = function setRowName(i, value) {
    i = api.normalizeRowIndex(i);

    if (is.undefined(i)) throw new Error('Expected first argument to be a row name or index');

    if (!is.string(value)) throw new Error('Expected the new name to be a string');

    if (is.null(grid.rowNames)) {
      grid.rowNames = new Array(api.height());
    }

    grid.rowNames[i] = value;

    return value;
  };

  var rowName = function rowName(i, value) {
    if (is.undefined(value)) return api.getRowName(i);

    return api.setRowName(i, value);
  };

  return { getRowName: getRowName, setRowName: setRowName, rowName: rowName };
};

module.exports = rowName;