# element-meta

Metadata for HTML5 elements, gathered from MDN, WHATWG etc.

`npm install @mojule/element-meta`

```javascript
const Data = require( '@mojule/element-meta' )

// exported as a function so that you can modify or extend the data if you need
// to and still be able to get the original data by calling the function again
const data = Data()

console.log( data.div )
```

## license

MIT
