'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var core = function core(api, grid) {
  var width = function width() {
    return api.getWidth(grid.rows);
  };
  var height = function height() {
    return api.getHeight(grid.rows);
  };

  var getRowsWithHeaders = function getRowsWithHeaders() {
    var hasColumnHeaders = api.hasColumnNames();
    var hasRowHeaders = api.hasRowNames();

    var rows = api.rows();

    if (hasColumnHeaders) {
      var headers = api.columnNames();
      rows = [headers].concat(_toConsumableArray(rows));
    }

    if (hasRowHeaders) {
      var _headers = api.rowNames();
      var y = hasColumnHeaders ? 1 : 0;

      rows = rows.map(function (row, i) {
        if (hasColumnHeaders && i === 0) return [''].concat(_toConsumableArray(row));

        return [_headers[i - y]].concat(_toConsumableArray(row));
      });
    }

    return rows;
  };

  return {
    width: width, height: height, getRowsWithHeaders: getRowsWithHeaders
  };
};

module.exports = core;