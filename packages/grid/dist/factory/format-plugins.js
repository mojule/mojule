'use strict';

var is = require('@mojule/is');

var FormatPlugins = function FormatPlugins(formats) {
  var plugins = function plugins(api, grid) {
    var $getFormat = function $getFormat(name) {
      return formats[name];
    };

    var $isFormat = function $isFormat(name, value) {
      var format = api.getFormat(name);

      if (is.undefined(format)) throw new Error('Unexpected format ' + format);

      return format.predicate(value);
    };

    var $formatFor = function $formatFor(value) {
      return api.formatNames().find(function (name) {
        return api.getFormat(name).predicate(value);
      });
    };

    var $fromFormat = function $fromFormat(name, value, options) {
      if (is.undefined(value)) {
        value = name;
        name = api.formatFor(value);
      }

      var format = api.getFormat(name);

      if (is.undefined(format)) throw new Error('Unexpected format ' + format);

      return format.toStateArgs(value, options);
    };

    var $formatNames = function $formatNames() {
      return Object.keys(formats);
    };

    var converters = Object.keys(formats).reduce(function (to, name) {
      to[name] = function () {
        return formats[name].fromGrid(api);
      };

      return to;
    }, {});

    var fns = {
      $getFormat: $getFormat, $isFormat: $isFormat, $formatFor: $formatFor, $fromFormat: $fromFormat, $formatNames: $formatNames
    };

    Object.assign(fns, converters);

    return fns;
  };

  return plugins;
};

module.exports = FormatPlugins;