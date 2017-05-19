'use strict';

var is = require('@mojule/is');
var parse = require('csv-parse/lib/sync');
var stringify = require('csv-stringify/lib/sync');

var predicate = function predicate(csv) {
  return is.string(csv);
};

var toStateArgs = function toStateArgs(csv, options) {
  var rows = parse(csv, { auto_parse: true });

  // csv parse does not handle booleans :/
  rows = rows.map(function (row) {
    return row.map(function (value) {
      if (!is.string(value)) return value;

      var s = value.toLowerCase();

      if (s === 'true') return true;
      if (s === 'false') return false;

      return value;
    });
  });

  return { rows: rows, options: options };
};

var fromGrid = function fromGrid(api) {
  var rows = api.getRowsWithHeaders();

  return stringify(rows, {
    formatters: {
      bool: function bool(val) {
        return val.toString().toUpperCase();
      }
    }
  });
};

module.exports = { predicate: predicate, toStateArgs: toStateArgs, fromGrid: fromGrid };