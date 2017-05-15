'use strict';

var domPlugins = require('@mojule/dom-plugins');
var is = require('@mojule/is');
var jsonDomPlugins = require('@mojule/json-dom-plugins');
var jsonTree = require('@mojule/json-tree');
var schemaTree = require('@mojule/schema-tree');
var stringTree = require('@mojule/string-tree');
var templating = require('@mojule/templating');
var transform = require('@mojule/transform');
var tree = require('@mojule/tree');
var treeFactory = require('@mojule/tree-factory');
var utils = require('@mojule/utils');
var vdom = require('@mojule/vdom');
var vfs = require('@mojule/vfs');

module.exports = {
  domPlugins: domPlugins, is: is, jsonDomPlugins: jsonDomPlugins, jsonTree: jsonTree, schemaTree: schemaTree, stringTree: stringTree, templating: templating,
  transform: transform, tree: tree, treeFactory: treeFactory, utils: utils, vdom: vdom, vfs: vfs
};