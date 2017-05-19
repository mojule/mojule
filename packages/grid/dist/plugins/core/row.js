'use strict';

var is = require('@mojule/is');

var row = function row(api, grid) {
  var getRow = function getRow(y, startX, endX) {
    y = api.normalizeRowIndex(y);
    startX = api.normalizeColumnIndex(startX);
    endX = api.normalizeColumnIndex(endX);

    return api.getRowFrom(grid.rows, y, startX, endX);
  };

  var setRow = function setRow(row) {
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    y = api.normalizeRowIndex(y);
    x = api.normalizeColumnIndex(x);

    row.forEach(function (item, i) {
      api.setValue(x + i, y, item);
    });

    return row;
  };

  var row = function row() {
    var head = arguments.length <= 0 ? undefined : arguments[0];

    if (is.array(head)) return api.setRow.apply(api, arguments);

    return api.getRow.apply(api, arguments);
  };

  return {
    getRow: getRow, setRow: setRow, row: row
  };
};

module.exports = row;