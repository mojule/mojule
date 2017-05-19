'use strict';

var is = require('@mojule/is');

var _require = require('@mojule/utils'),
    range = _require.range;

var columnNames = function columnNames(api, grid) {
  var hasColumnNames = function hasColumnNames() {
    return !is.null(grid.columnNames);
  };

  var getColumnNames = function getColumnNames() {
    if (is.null(grid.columnNames)) return range(api.width()).map(api.columnIndexToName);

    return grid.columnNames.slice();
  };

  var setColumnNames = function setColumnNames(names) {
    grid.columnNames = names;

    return names;
  };

  var columnNames = function columnNames(names) {
    if (is.undefined(names)) return api.getColumnNames();

    return api.setColumnNames(names);
  };

  return { hasColumnNames: hasColumnNames, getColumnNames: getColumnNames, setColumnNames: setColumnNames, columnNames: columnNames };
};

module.exports = columnNames;