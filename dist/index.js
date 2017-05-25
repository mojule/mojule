'use strict';

var apiFactory = require('@mojule/api-factory');
var domPlugins = require('@mojule/dom-plugins');
var flatten = require('@mojule/flatten');
var grid = require('@mojule/grid');
var html = require('@mojule/html');
var is = require('@mojule/is');
var jsonDomPlugins = require('@mojule/json-dom-plugins');
var jsonTree = require('@mojule/json-tree');
var mmon = require('@mojule/mmon');
var schemaTree = require('@mojule/schema-tree');
var stringTree = require('@mojule/string-tree');
var templating = require('@mojule/templating');
var tree = require('@mojule/tree');
var treeFactory = require('@mojule/tree-factory');
var utils = require('@mojule/utils');
var vdom = require('@mojule/vdom');
var vfs = require('@mojule/vfs');

var src = function src() {
  var apiFactory = require('@mojule/api-factory/src');
  var domPlugins = require('@mojule/dom-plugins/src');
  var flatten = require('@mojule/flatten/src');
  var grid = require('@mojule/grid/src');
  var html = require('@mojule/html/src');
  var is = require('@mojule/is/src');
  var jsonDomPlugins = require('@mojule/json-dom-plugins/src');
  var jsonTree = require('@mojule/json-tree/src');
  var mmon = require('@mojule/mmon/src');
  var schemaTree = require('@mojule/schema-tree/src');
  var stringTree = require('@mojule/string-tree/src');
  var templating = require('@mojule/templating/src');
  var tree = require('@mojule/tree/src');
  var treeFactory = require('@mojule/tree-factory/src');
  var utils = require('@mojule/utils/src');
  var vdom = require('@mojule/vdom/src');
  var vfs = require('@mojule/vfs/src');

  return {
    apiFactory: apiFactory, domPlugins: domPlugins, flatten: flatten, grid: grid, html: html, is: is, jsonDomPlugins: jsonDomPlugins, jsonTree: jsonTree,
    mmon: mmon, schemaTree: schemaTree, stringTree: stringTree, templating: templating, tree: tree, treeFactory: treeFactory, utils: utils, vdom: vdom,
    vfs: vfs
  };
};

module.exports = {
  apiFactory: apiFactory, domPlugins: domPlugins, flatten: flatten, grid: grid, html: html, is: is, jsonDomPlugins: jsonDomPlugins, jsonTree: jsonTree,
  mmon: mmon, schemaTree: schemaTree, stringTree: stringTree, templating: templating, tree: tree, treeFactory: treeFactory, utils: utils, vdom: vdom, vfs: vfs,
  src: src()
};