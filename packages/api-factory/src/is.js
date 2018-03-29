'use strict'

const { is, extendDefaults } = require( '@mojule/is' )

const plugin = plugin => is.array( plugin ) && plugin.every( is.function )

const plugins = plugins => {
  if( !is.object( plugins ) ) return false

  const { core = [], statics = [], api = [], privates = [] } = plugins

  return (
    plugin( core ) && plugin( statics ) && plugin( api ) &&
    plugin( privates )
  )
}

const predicates = { plugin, plugins }
const apiFactoryIs = extendDefaults( predicates )

module.exports = apiFactoryIs
