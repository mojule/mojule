'use strict';

var is = require('@mojule/is');

var predicate = function predicate(rows) {
  return is.array(rows) && rows.every(is.array);
};

var columnHeaders = function columnHeaders(rows) {
  return rows[0];
};

module.exports = { predicate: predicate, columnHeaders: columnHeaders };