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

var toRows = function toRows(models) {
  var headers = columnHeaders(models);
  var rows = models.map(function (model) {
    return headers.map(function (key) {
      return model[key];
    });
  });

  return [headers].concat(_toConsumableArray(rows));
};

var fromRows = function fromRows(rows, headers) {
  return rows.map(function (row) {
    return row.reduce(function (obj, value, x) {
      obj[headers[x]] = value;

      return obj;
    }, {});
  });
};

module.exports = { predicate: predicate, columnHeaders: columnHeaders, toRows: toRows, fromRows: fromRows };