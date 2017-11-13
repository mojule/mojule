'use strict'

const is = require( '@mojule/is' )
const { selectAll, parse } = require( '@mojule/dom-utils' )

const GetTemplates = options => {
  const { document } = options

  const getTemplates = el => {
    if( is.string( el ) )
      el = parse( document, el )

    const templateEls = selectAll( el, 'template[id]' )

    return templateEls.reduce( ( templates, el ) => {
      const { id } = el

      templates[ id ] = el.content.cloneNode( true )

      return templates
    }, {})
  }

  return getTemplates
}

module.exports = GetTemplates
