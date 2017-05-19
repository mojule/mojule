'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var is = require("@mojule/is");
var chunk = require('lodash.chunk');

var values = function values(api, grid) {
  var getValues = function getValues() {
    return api.rows().reduce(function (values, row) {
      values.push.apply(values, _toConsumableArray(row));

      return values;
    }, []);
  };

  var setValues = function setValues(values) {
    grid.rows = chunk(values, api.width());

    return values;
  };

  var values = function values(_values) {
    if (is.undefined(_values)) return api.getValues();

    return api.setValues(_values);
  };

  return { getValues: getValues, setValues: setValues, values: values };
};

module.exports = values;