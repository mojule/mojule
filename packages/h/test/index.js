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

  it( 'data', () => {
    const { div } = h

    const dom = div(
      div({
        data: {
          firstName: 'Nik',
          lastName: 'Coughlin'
        }
      })
    )

    const html = dom.innerHTML

    const expect = '<div data-first-name="Nik" data-last-name="Coughlin"></div>'

    assert.strictEqual( html, expect )
  })

  it( 'style', () => {
    const { div } = h

    const dom = div(
      div({
        style: {
          'font-size': '16px',
          'fontWeight': 'bold'
        }
      })
    )

    const html = dom.innerHTML

    const expect = '<div style="font-size: 16px; font-weight: bold;"></div>'

    assert.strictEqual( html, expect )
  })
})
