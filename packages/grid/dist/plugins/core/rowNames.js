'use strict';

var is = require('@mojule/is');

var _require = require('@mojule/utils'),
    range = _require.range;

var rowNames = function rowNames(api, grid) {
  var hasRowNames = function hasRowNames() {
    return !is.null(grid.rowNames);
  };

  var getRowNames = function getRowNames() {
    if (is.null(grid.rowNames)) return range(api.height()).map(function (i) {
      return i.toString();
    });

    return grid.rowNames.slice();
  };

  var setRowNames = function setRowNames(names) {
    grid.rowNames = names;

    return names;
  };

  var rowNames = function rowNames(names) {
    if (is.undefined(names)) return api.getRowNames();

    return api.setRowNames(names);
  };

  return { hasRowNames: hasRowNames, getRowNames: getRowNames, setRowNames: setRowNames, rowNames: rowNames };
};

module.exports = rowNames;