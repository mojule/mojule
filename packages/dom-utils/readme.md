# dom-utils

DOM traversal/query/manipulation functions

`npm install @mojule/dom-utils`

## example

```javascript
const utils = require( '@mojule/dom-utils' )

const { parse, stringify, wrap, walk } = utils
const html = '<div>Hello</div>'
const div = parse( document, html )

walk( div, current => {
  if( current.nodeName === '#text' ){
    const p = document.createElement( 'p' )

    wrap( current, p )
  }
})

// '<div><p>Hello</p></div>'
console.log( stringify( div ) )
```

## License

[MIT](https://github.com/mojule/mojule/blob/master/LICENSE)