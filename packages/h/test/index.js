'use strict'

const document = require( '@mojule/document' )
const assert = require( 'assert' )
const H = require( '../' )
const h = H( document )

describe( 'H', () => {
  it( 'works', () => {
    const { element, textNode, comment, documentFragment, div } = h

    const dom = div(
      div( { id: 'foo', click: e => { console.log( 'clicked foo' ) } },
        documentFragment(
          element( 'span', 'hello' ),
          ' ',
          textNode( 'world' ),
          comment( 'comment' )
        )
      )
    )

    const html = dom.innerHTML

    const expect = `
      <div id="foo"><span>hello</span> world<!--comment--></div>
    `.trim()

    assert.strictEqual( html, expect )
  })

  it( 'bad argument', () => {
    const { div } = h

    assert.throws( () => div( null ) )
  })
})
