'use strict';

var is = require("@mojule/is");

var value = function value(api, grid) {
  var getValue = function getValue(x, y) {
    x = api.normalizeColumnIndex(x);

    var row = api.row(y);

    return row[x];
  };

  var setValue = function setValue(x, y, value) {
    x = api.normalizeColumnIndex(x);

    grid.rows[y][x] = value;

    return value;
  };

  var value = function value(x, y, _value) {
    if (is.undefined(_value)) return api.getValue(x, y);

    return api.setValue(x, y, _value);
  };

  return { getValue: getValue, setValue: setValue, value: value };
};

module.exports = value;