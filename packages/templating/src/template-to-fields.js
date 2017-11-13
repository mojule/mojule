'use strict'

const domUtils = require( '@mojule/dom-utils' )
const utils = require( '@mojule/utils' )
const elementTokens = require( '../src/element-tokens' )

const { walk, walkUp } = domUtils
const { clone } = utils

const toFields = ( name, { getTemplate, populators, tokens, document, maxDepth = 2 }) => {
  const fields = []
  const included = []

  const dom = getTemplate( name )
  const done = new Map()

  walk( dom, node => {
    elementTokens( node, tokens, tokenData => {
      done.set( node, tokenData )

      const { tokenName, action, attributeValue, path } = tokenData

      let type = ''
      const token = tokens[ tokenName ]
      if( token ){
        const { types } = token
        type = types[ action ] || ''
      }

      if( tokenName === 'attr' && type === '' ){
        type = 'string'
      }

      if( tokenName === 'each' ){
        const populateAction = {
          action, path, value: [ true ]
        }

        populators.each({ node, populateAction, document })
      }

      if( tokenName === 'include' ){
        let currentDepth = 0
        walkUp( node, current => {
          if( current === node ) return

          if( done.has( current ) ){
            const tokenData = done.get( current )
            if( tokenData.tokenName !== 'include' ) return
            if( tokenData.attributeValue !== attributeValue ) return
            currentDepth++
          }
        })

        if( currentDepth < maxDepth ){
          const populateAction = {
            action, value: getTemplate( attributeValue )
          }

          populators.include({ node, populateAction, onInclude: () => {} })
        }
      }

      if( path && type )
        fields.push( { path, type } )
    })
  })

  return fields
}

module.exports = toFields
