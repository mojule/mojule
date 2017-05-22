'use strict';

var is = require('@mojule/is');

var columns = function columns(api, grid) {
  var getColumns = function getColumns(startX, endX, startY, endY) {
    startY = api.normalizeRowIndex(startY);
    endY = api.normalizeRowIndex(endY);
    startX = api.normalizeColumnIndex(startX);
    endX = api.normalizeColumnIndex(endX);

    return api.getColumnsFrom(grid.rows, startX, endX, startY, endY);
  };

  var setColumns = function setColumns(columns) {
    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    x = api.normalizeColumnIndex(x);
    y = api.normalizeRowIndex(y);

    columns.forEach(function (col, i) {
      api.setColumn(col, x + i, y);
    });

    return columns;
  };

  var columns = function columns() {
    var head = arguments.length <= 0 ? undefined : arguments[0];

    if (is.array(head)) return api.setColumns.apply(api, arguments);

    return api.getColumns.apply(api, arguments);
  };

  return {
    getColumns: getColumns, setColumns: setColumns, columns: columns
  };
};

module.exports = columns;