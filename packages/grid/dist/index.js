'use strict';

var Factory = require('./factory');

var Grid = Factory();

Object.assign(Grid, { Factory: Factory });

module.exports = Grid;