'use strict'

const domPlugins = require( '@mojule/dom-plugins' )
const is = require( '@mojule/is' )
const jsonDomPlugins = require( '@mojule/json-dom-plugins' )
const jsonTree = require( '@mojule/json-tree' )
const schemaTree = require( '@mojule/schema-tree' )
const stringTree = require( '@mojule/string-tree' )
const templating = require( '@mojule/templating' )
const transform = require( '@mojule/transform' )
const tree = require( '@mojule/tree' )
const treeFactory = require( '@mojule/tree-factory' )
const utils = require( '@mojule/utils' )
const vdom = require( '@mojule/vdom' )
const vfs = require( '@mojule/vfs' )

module.exports = {
  domPlugins, is, jsonDomPlugins, jsonTree, schemaTree, stringTree, templating,
  transform, tree, treeFactory, utils, vdom, vfs
}
