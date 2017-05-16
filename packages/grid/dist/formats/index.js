'use strict';

var rows = require('./rows');
var columns = require('./columns');
var models = require('./models');
var columnsModel = require('./columnsModel');
var values = require('./values');

var formats = { rows: rows, columns: columns, models: models, columnsModel: columnsModel, values: values };

module.exports = formats;