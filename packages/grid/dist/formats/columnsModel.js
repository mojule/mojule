'use strict';

var is = require('@mojule/is');

var predicate = function predicate(columnsModel) {
  return is.object(columnsModel) && Object.keys(columnsModel).every(function (key) {
    return is.array(columnsModel[key]);
  });
};

var columnHeaders = function columnHeaders(columnsModel) {
  return Object.keys(columnsModel);
};

var toStateArgs = function toStateArgs(columnsModel) {
  var columnNames = columnHeaders(columnsModel);

  var height = columnNames.reduce(function (max, key) {
    return columnsModel[key].length > max ? columnsModel[key].length : max;
  }, 0);

  var rows = [columnNames];

  var getRow = function getRow(y) {
    return columnNames.reduce(function (row, key) {
      row.push(columnsModel[key][y]);

      return row;
    }, []);
  };

  for (var y = 0; y < height; y++) {
    rows.push(getRow(y));
  }var options = {
    hasColumnNames: true
  };

  return { rows: rows, options: options };
};

var fromGrid = function fromGrid(api) {
  var columns = api.columns();
  var columnNames = api.columnNames();

  return columns.reduce(function (obj, col, x) {
    obj[columnNames[x]] = col.slice();

    return obj;
  }, {});
};

module.exports = { predicate: predicate, toStateArgs: toStateArgs, fromGrid: fromGrid };