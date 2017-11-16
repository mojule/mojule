# is

A type checking facade that doesn't care how you check types - use duck typing,
use JSON schema, whatever.

We needed a consistent interface for type checking, sometimes we use duck typing,
sometimes we use JSON schema, regardless of which, we tend to follow the same
general pattern, __is__ codifies this.

```javascript
is.string( '' ) // true
is.string( 42 ) // false
```

## usage

`npm install @mojule/is`


### Using default predicates:

```javascript
const is = require( '@mojule/is' )

// These all return true
is.number( 1.1 )
is.integer( 1.0 )
is.string( '' )
is.boolean( true )
is.array( [] )
is.null( null )
is.undefined( undefined )
is.function( i=>i+1 )
is.object({})
is.empty({})
```

The [default predicates](src/default-predicates.js) are moderately opinionated,
e.g. don't consider `null` or `[]` to be `is.object`

### With custom predicates

Here we define additional predicates which extend the default predicates.

```javascript
const Is = require( '@mojule/is' )

const predicates = {
  domNode: subject => Is.object( subject ) && Is.string( subject.nodeName ),
  div: subject => predicates.domNode( subject ) && subject.nodeName.toLowerCase() === 'div'
}

const is = Is( predicates )

is.string( '' )

const div = document.querySelector( 'div' )

// These return true
is.domNode( div )
is.div( div )
```


### Additional functions

In addition to testing against single predicates by name, as above, we provide these additonal functions, `is`, `isOnly`, `some`, `every`, `of`, `allOf`.


```javascript
const Is = require( '@mojule/is' )

const predicates = {
  domNode: subject => Is.object( subject ) && Is.string( subject.nodeName ),
  div: subject => predicates.domNode( subject ) && subject.nodeName.toLowerCase() === 'div'
}

const is = Is( predicates )

const span = document.querySelector( 'span' )
const div = document.querySelector( 'div' )
// Returns true as predicate for span not in predicates above.
is.isOnly( span, 'domNode' )

// Returns false as div is also 'div'
is.isOnly( div, 'domNode' )

// Returns true
is.some( span, 'domNode', 'div' )

// Returns true
is.every( div, 'domNode', 'div' )

// Returns 'domNode' i.e. The first predicate that matches div
is.of( div )

// Returns [ 'domNode', 'div' ] i.e. An array of names of all predicates matching div
is.allOf( div )

```

Note: Predicates are checked __in the order__ that the keys are declared
i.e. In the above example `is.of( div )` returns the predicate name `'domNode'`
and not `'div'` because `'domNode'` is declared first in the passed custom predicates.


### Notes

`@mojule/is` exports instance with default predicates and factory function with parameter accepting extending predicates.

i.e.
```javascript
const Is = require( '@mojule/is' )

Is.number( 1.1 ) // Returns true

const is = Is()
is.number( 1.1 ) // Returns true

const is1 = Is( { string4: subject => Is.string( subject ) && ( subject.length === 4 ) } )
is1.string4( 'abcd' ) // Returns true
```

## License

[MIT](https://github.com/mojule/mojule/blob/master/LICENSE)