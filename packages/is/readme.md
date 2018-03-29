# is

A type checking facade that doesn't care how you check types - use duck typing,
use JSON schema, whatever.

We needed a consistent interface for type checking, sometimes we use duck
typing, sometimes we use JSON schema, regardless of which, we tend to follow the
same general pattern, __is__ codifies this.

```javascript
is.string( '' ) // true
is.string( 42 ) // false
```

## usage

`npm install @mojule/is`

### Using default predicates:

```javascript
const { is } = require( '@mojule/is' )

// These all return true
is.number( 1.1 )
is.integer( 1.0 )
is.string( '' )
is.boolean( true )
is.array( [] )
is.null( null )
is.undefined( undefined )
is.function( i => i + 1 )
is.object({})
is.empty({})
```

The [default predicates](src/is.ts) are moderately opinionated, e.g. they don't
consider `null` or `[]` to be `is.object`

### With custom predicates

Here we define additional predicates which extend the default predicates.

```javascript
const { is, extendDefaults } = require( '@mojule/is' )

const predicates = {
  domNode: subject =>
    is.object( subject ) && is.string( subject.nodeName ),
  div: subject =>
    predicates.domNode( subject ) && subject.nodeName.toLowerCase() === 'div'
}

const domIs = extendDefaults( predicates )

// using the default
domIs.string( '' )

const div = document.querySelector( 'div' )

// These return true
domIs.domNode( div )
domIs.div( div )
```


### Additional functions

In addition to testing against single predicates by name, as above, we provide
these additional utility functions, `isType`, `isOnly`, `some`, `every`, `of`,
`allOf`.

```javascript
const { is, utils, Utils } = require( '@mojule/is' )

// utils uses the default predicates
console.log( utils.isOnly( 'abc', 'string' ) )

const predicates = {
  domNode: subject =>
    Is.is.object( subject ) && Is.is.string( subject.nodeName ),
  div: subject =>
    predicates.domNode( subject ) && subject.nodeName.toLowerCase() === 'div'
}

// the Utils factory function can create utility functions for custom predicates
const domUtils = Utils( predicates )

const span = document.querySelector( 'span' )
const div = document.querySelector( 'div' )

// Returns true as predicate for span not in predicates above.
domUtils.isOnly( span, 'domNode' )

// Returns false as div is also 'div'
domUtils.isOnly( div, 'domNode' )

// Returns true, as span matches domNode
domUtils.some( span, 'domNode', 'div' )

// Returns true as a div is both a domNode and a div
domUtils.every( div, 'domNode', 'div' )

// Returns 'domNode' i.e. The first predicate that matches div
domUtils.of( div )

// Returns [ 'domNode', 'div' ] i.e. An array of names of all predicates matching div
domUtils.allOf( div )
```

Note: Predicates are checked __in the order__ that the keys are declared i.e. in
the above example `utils.of( div )` returns the predicate name `'domNode'`
and not `'div'` because `'domNode'` is declared first in the passed custom
predicates.

## License

[MIT](https://github.com/mojule/mojule/blob/master/LICENSE)
