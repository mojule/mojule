'use strict'

const domUtils = require( '@mojule/dom-utils' )
const jsonPointer = require( '@mojule/json-pointer' )
const elementTokens = require( './element-tokens' )

const { walk, walkUp, unwrap, rename } = domUtils
const match = jsonPointer.get

const getKeyvalueAncestor = node => {
  let result

  walkUp( node, current => {
    if( current.localName === 'keyvalue' ){
      result = current
      return true
    }
  })

  return result
}

const populate = ( name, model, options ) => {
  const {
    populators, tokens, strict, removeTokens, excludeStrict, onInclude,
    document, getTemplate
  } = options

  const tokenNames = Object.keys( tokens )
  const dom = getTemplate( name )
  const removeTags = new Set()
  const removeAttrs = []
  const tags = []

  walk( dom, node => {
    elementTokens( node, tokens, populateAction => {
      const { tokenName, action, attributeValue, path, attributeName } = populateAction
      const token = tokens[ tokenName ]

      if( tokenName === 'tag' ){
        tags.push( node )

        return
      }

      if( tokenName === 'include' ){
        const template = getTemplate( attributeValue )

        if( strict && !excludeStrict.includes( tokenName ) )
          token.validate( template, name, attributeValue )

        Object.assign( populateAction, { value: template, templateName: attributeValue } )
      } else {
        let value

        if( path.endsWith( '$key' ) ){
          const keyvalue = getKeyvalueAncestor( node )

          value = keyvalue.getAttribute( 'key' )
        } else {
          value = match( model, path )
        }

        if( strict && !excludeStrict.includes( tokenName ) )
          token.validate( value, name, path )

        Object.assign( populateAction, { value } )
      }

      const populator = populators[ tokenName ]

      if( populator ){
        const populatorOptions = Object.assign( {}, options, {
          node,
          populateAction
        })

        populator( populatorOptions )
      }

      if( removeTokens ){
        if( attributeName ){
          removeAttrs.push( { node, attributeName } )
        } else {
          removeTags.add( node )
        }
      }
    })
  })

  tags.forEach( tag => {
    const name = tag.getAttribute( 'tagname' )

    if( removeTokens )
      tag.removeAttribute( 'tagname' )

    rename( document, tag, name )
  })

  removeTags.forEach( tag => unwrap( tag ) )

  removeAttrs.forEach( attr => {
    const { node, attributeName } = attr

    node.removeAttribute( attributeName )
  })

  if( dom.nodeType === 11 && dom.firstChild === dom.lastChild )
    return dom.firstChild

  return dom
}

module.exports = populate
