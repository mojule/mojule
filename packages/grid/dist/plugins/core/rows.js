'use strict';

var is = require('@mojule/is');

var rows = function rows(api, grid) {
  var getRows = function getRows(startY, endY, startX, endX) {
    startX = api.normalizeColumnIndex(startX);
    endX = api.normalizeColumnIndex(endX);
    startY = api.normalizeRowIndex(startY);
    endY = api.normalizeRowIndex(endY);

    return api.getRowsFrom(grid.rows, startY, endY, startX, endX);
  };

  var setRows = function setRows(rows) {
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    x = api.normalizeColumnIndex(x);
    y = api.normalizeRowIndex(y);

    rows.forEach(function (row, i) {
      api.setRow(row, y + i, x);
    });

    return rows;
  };

  var rows = function rows() {
    var head = arguments.length <= 0 ? undefined : arguments[0];

    if (is.array(head)) return api.setRows.apply(api, arguments);

    return api.getRows.apply(api, arguments);
  };

  return {
    getRows: getRows, setRows: setRows, rows: rows
  };
};

module.exports = rows;