'use strict';

var ApiFactory = require('@mojule/api-factory');
var is = require('@mojule/is');
var defaultPlugins = require('../plugins');
var formats = require('../formats');
var FormatPlugins = require('./format-plugins');

var isRows = function isRows(rows) {
  return is.array(rows) && rows.every(is.array);
};

var isNames = function isNames(value) {
  return is.null(value) || is.array(value);
};

var defaultOptions = {
  formats: formats,
  isState: function isState(state) {
    return is.object(state) && isRows(state.rows) && isNames(state.columnNames) && isNames(state.rowNames);
  }
};

var GridFactory = function GridFactory() {
  for (var _len = arguments.length, plugins = Array(_len), _key = 0; _key < _len; _key++) {
    plugins[_key] = arguments[_key];
  }

  var options = {};

  if (plugins.length > 0 && is.object(plugins[plugins.length - 1])) options = plugins.pop();

  options = Object.assign({}, defaultOptions, options);

  if (plugins.length === 1 && is.array(plugins[0])) plugins = plugins[0];

  if (!plugins.every(is.function)) throw new Error('Expected every plugin to be a function');

  var _options = options,
      formats = _options.formats;


  if (is.object(formats)) defaultPlugins.push(FormatPlugins(formats));

  plugins = defaultPlugins.concat(plugins);

  var Grid = ApiFactory(plugins, options);

  return Grid;
};

module.exports = GridFactory;