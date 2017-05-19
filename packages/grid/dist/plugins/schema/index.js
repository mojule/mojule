'use strict';

var is = require('@mojule/is');

var typenames = ['string', 'integer', 'number', 'boolean', 'array', 'object'];

var infoToSchema = function infoToSchema(info) {
  var required = [];

  var properties = info.names.reduce(function (props, name) {
    if (info.values[name].length === info.count) required.push(name);

    var typeSet = info.values[name].reduce(function (set, value) {
      var name = typenames.find(function (typename) {
        return is[typename](value);
      });

      if (name) set.add(name);

      return set;
    }, new Set());

    var types = Array.from(typeSet).sort();

    var type = 'any';

    if (types.length === 1) type = types[0];

    if (types.length === 2 && types[0] === 'integer' && types[1] === 'number') type = 'number';

    props[name] = { type: type };

    return props;
  }, {});

  return { properties: properties, required: required };
};

var schema = function schema(api) {
  var collectModelInfo = function collectModelInfo() {
    var info = {
      count: api.height(),
      names: api.columnNames(),
      values: api.columnsModel()
    };

    return info;
  };

  return {
    schema: function schema() {
      return infoToSchema({
        count: api.height(),
        names: api.columnNames(),
        values: api.columnsModel()
      });
    }
  };
};

module.exports = schema;