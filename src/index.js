'use strict'

const apiFactory = require( '@mojule/api-factory' )
const domPlugins = require( '@mojule/dom-plugins' )
const flatten = require( '@mojule/flatten' )
const grid = require( '@mojule/grid' )
const html = require( '@mojule/html' )
const is = require( '@mojule/is' )
const jsonDomPlugins = require( '@mojule/json-dom-plugins' )
const jsonTree = require( '@mojule/json-tree' )
const mmon = require( '@mojule/mmon' )
const schemaTree = require( '@mojule/schema-tree' )
const stringTree = require( '@mojule/string-tree' )
const templating = require( '@mojule/templating' )
const tree = require( '@mojule/tree' )
const treeFactory = require( '@mojule/tree-factory' )
const utils = require( '@mojule/utils' )
const vdom = require( '@mojule/vdom' )
const vfs = require( '@mojule/vfs' )

const src = () => {
  const apiFactory = require( '@mojule/api-factory/src' )
  const domPlugins = require( '@mojule/dom-plugins/src' )
  const flatten = require( '@mojule/flatten/src' )
  const grid = require( '@mojule/grid/src' )
  const html = require( '@mojule/html/src' )
  const is = require( '@mojule/is/src' )
  const jsonDomPlugins = require( '@mojule/json-dom-plugins/src' )
  const jsonTree = require( '@mojule/json-tree/src' )
  const mmon = require( '@mojule/mmon/src' )
  const schemaTree = require( '@mojule/schema-tree/src' )
  const stringTree = require( '@mojule/string-tree/src' )
  const templating = require( '@mojule/templating/src' )
  const tree = require( '@mojule/tree/src' )
  const treeFactory = require( '@mojule/tree-factory/src' )
  const utils = require( '@mojule/utils/src' )
  const vdom = require( '@mojule/vdom/src' )
  const vfs = require( '@mojule/vfs/src' )

  return {
    apiFactory, domPlugins, flatten, grid, html, is, jsonDomPlugins, jsonTree,
    mmon, schemaTree, stringTree, templating, tree, treeFactory, utils, vdom,
    vfs
  }
}

module.exports = {
  apiFactory, domPlugins, flatten, grid, html, is, jsonDomPlugins, jsonTree,
  mmon, schemaTree, stringTree, templating, tree, treeFactory, utils, vdom, vfs,
  src: src()
}
