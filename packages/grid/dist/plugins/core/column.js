'use strict';

var is = require('@mojule/is');

var column = function column(api, grid) {
  var getColumn = function getColumn(x, startY, endY) {
    /*
      allow column and row names to be used, but converts them to indices for
      the underlying static function - leaves any undefined values as is, so
      that the static function's default values will be used if any arguments
      are omitted
    */
    x = api.normalizeColumnIndex(x);
    startY = api.normalizeRowIndex(startY);
    endY = api.normalizeRowIndex(endY);

    return api.getColumnFrom(grid.rows, x, startY, endY);
  };

  var setColumn = function setColumn(col) {
    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    x = api.normalizeColumnIndex(x);
    y = api.normalizeRowIndex(y);

    col.forEach(function (item, i) {
      api.setValue(x, y + i, item);
    });

    return col;
  };

  var column = function column() {
    var head = arguments.length <= 0 ? undefined : arguments[0];

    if (is.array(head)) return api.setColumn.apply(api, arguments);

    return api.getColumn.apply(api, arguments);
  };

  return {
    getColumn: getColumn, setColumn: setColumn, column: column
  };
};

module.exports = column;