# h

API for creating DOM nodes, like hyperscript

`npm install @mojule/h`

```javascript
const H = require( '@mojule/h' )

// window.document, JSDOM document instance, etc
const h = H( document )

const { element, textNode, comment, documentFragment, div, p } = h

const dom = div(
  p(
    {
      id: 'foo',
      click: e => console.log( 'clicked #foo' )
    },
    documentFragment(
      element( 'custom-tag', 'hello' ),
      ' ',
      textNode( 'world' ),
      comment( 'bar' )
    )
  )
)

// <p id="foo"><custom-tag>hello</custom-tag> world<!--bar--></p>
console.log( dom.innerHTML )
```