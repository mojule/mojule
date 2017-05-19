'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var is = require('@mojule/is');

var predicate = function predicate(models) {
  return is.array(models) && models.every(is.object);
};

var columnHeaders = function columnHeaders(models) {
  return models.reduce(function (names, model) {
    Object.keys(model).forEach(function (name) {
      if (!names.includes(name)) names.push(name);
    });

    return names;
  }, []);
};

var toStateArgs = function toStateArgs(models) {
  var columnNames = columnHeaders(models);
  var rows = [columnNames].concat(_toConsumableArray(models.map(function (model) {
    return columnNames.map(function (key) {
      return model[key];
    });
  })));

  var options = {
    hasColumnNames: true
  };

  return { rows: rows, options: options };
};

var fromGrid = function fromGrid(api) {
  var rows = api.rows();
  var columnNames = api.columnNames();

  return rows.map(function (row) {
    return row.reduce(function (obj, value, x) {
      obj[columnNames[x]] = value;

      return obj;
    }, {});
  });
};

module.exports = { predicate: predicate, toStateArgs: toStateArgs, fromGrid: fromGrid };