'use strict'

const populate = require( './populate' )
const GetTemplates = require( './get-templates' )
const populators = require( './populators' )
const templateToFields = require( './template-to-fields' )
const tokens = require( './tokens' )

const defaultOptions = {
  populators,
  tokens,
  strict: false,
  useCache: false,
  removeTokens: true,
  excludeStrict: [],
  onInclude: () => {}
}

const Templating = ( templates, options ) => {
  const getTemplate = name => {
    if( templates[ name ] ) return templates[ name ].cloneNode( true )
  }

  options = Object.assign(
    { getTemplate },
    defaultOptions,
    options
  )

  const { useCache } = options

  if( !options.document )
    throw Error( 'Expected a document in options' )

  let cache = {}
  const cacheExcludes = {}

  const templating = ( name, model ) => {
    const cacheKey = name + '-' + JSON.stringify( model )

    if( useCache && !cacheExcludes[ name ] && cache[ cacheKey ] )
      return cache[ cacheKey ].cloneNode( true )

    const populated = populate( name, model, options )

    if( useCache && !cacheExcludes[ name ] )
      cache[ cacheKey ] = populated

    return populated
  }

  templating.excludeFromCache = name => {
    cacheExcludes[ name ] = true
  }

  templating.toFields = name => templateToFields( name, options )

  return templating
}

Templating.GetTemplates = GetTemplates

module.exports = Templating
