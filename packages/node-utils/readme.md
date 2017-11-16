# dom-utils

Tree node utilities

`npm install @mojule/node-utils`

## example

```javascript
const utils = require( '@mojule/node-utils' )

const { walk } = utils

walk( node, current => {
  if( current.value === 'target' ){
    console.log( 'found target' )

    return true
  }
})
```

## License

[MIT](https://github.com/mojule/mojule/blob/master/LICENSE)
