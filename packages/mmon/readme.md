# MMON

Mojule Model Object Notation

A simple DSL for generating nested model nodes

## Install

`npm install @mojule/mmon`

## Example

```javascript
const MMON = require( '@mojule/mmon' )

const data = `
page>
  title: Acme - Home

  header>
    nav>
      classes[] navigation navigation--primary
      current: /
      links[]
        {}
          title: Home
          uri: /
        {}
          title: About
          uri: /about
        {}
          title: Products
          uri: /products
        {}
          title: Contact
          uri: /contact

  main>
    content$
      # Welcome to Acme

      The leading purveyor of miscellaneous goods

      - Explosive tennis balls
      - Jet-propelled unicycles
      - Female road-runner costumes
      - Dehydrated goods, just add water:
        - Dehydrated boulders
        - Dehydrated water

      And much, much more!

  footer>
`

const model = MMON.parse( data )

console.log( JSON.stringify( model, null, 2 ) )
```

```json
[
  {
    "name": "page",
    "model": {
      "title": "Acme - Home"
    }
  },
  [
    {
      "name": "header",
      "model": {}
    },
    [
      {
        "name": "nav",
        "model": {
          "classes": [
            "navigation",
            "navigation--primary"
          ],
          "current": "/",
          "links": [
            {
              "title": "Home",
              "uri": "/"
            },
            {
              "title": "About",
              "uri": "/about"
            },
            {
              "title": "Products",
              "uri": "/products"
            },
            {
              "title": "Contact",
              "uri": "/contact"
            }
          ]
        }
      }
    ]
  ],
  [
    {
      "name": "main",
      "model": {
        "content": "# Welcome to Acme\n\nThe leading purveyor of miscellaneous goods\n\n- Explosive tennis balls\n- Jet-propelled unicycles\n- Female road-runner costumes\n- Dehydrated goods, just add water:\n  - Dehydrated boulders\n  - Dehydrated water\n\nAnd much, much more!\n"
      }
    }
  ],
  [
    {
      "name": "footer",
      "model": {}
    }
  ]
]
```

## Syntax

### Nodes

Create the nesting structure of the model:

#### input

```
root>
  child1>
    grandchild1>
    grandchild2>
  child2>
  child3>
    grandchild3>
```

#### output

```json
[
  {
    "name": "root",
    "model": {}
  },
  [
    {
      "name": "child1",
      "model": {}
    },
    [
      {
        "name": "grandchild1",
        "model": {}
      }
    ],
    [
      {
        "name": "grandchild2",
        "model": {}
      }
    ]
  ],
  [
    {
      "name": "child2",
      "model": {}
    }
  ],
  [
    {
      "name": "child3",
      "model": {}
    },
    [
      {
        "name": "grandchild3",
        "model": {}
      }
    ]
  ]
]
```

### Node models

Properties for the node's model are defined as children of that node:

#### input

```
root>
  foo: properties which are children of a tag become properties of the node model
  types>
    // inline string syntax
    foo: unquoted string with spaces is parsed as a single string
    // quoted strings are the same as JSON strings
    bar: "strings can also be quoted and contain \"escaped quotes\""
    // numbers are unquoted
    baz: 15
    // if a string looks like a number, quote it
    qux: "1.16"
    // constants
    isFoo: true
    isBar: false
    optional: null
    // if a string looks like a constant, quote it
    foofoo: "true"
    /*
      Inline arrays are space separated. Strings containing spaces must be
      quoted
    */
    foos[] string1 string2 string3 42 true false null "Hello, World!"
    // large arrays can be separated across multiple lines
    large[]
      isNode isValue createRawNode getChildren getValue setValue remove add get
      "42" 42 true "true" false null "string with spaces"
    // nested arrays and objects work the same way, but without identifiers
    nested[]
      isNode isValue createRawNode getChildren getValue setValue remove add get
      [] string1 string2 string3
      []
        getParent lastChild nextSibling previousSibling siblings walk walkUp
        accepts atPath contains find findAll getMeta getPath hasChild
      {}
        foo: true
        bar: false
    // object syntax
    barbaz{}
      foo: true
      bar: 3.1415
```

#### output

```json
[
  {
    "name": "root",
    "model": {
      "foo": "properties which are children of a tag become properties of the node model"
    }
  },
  [
    {
      "name": "types",
      "model": {
        "foo": "unquoted string with spaces is parsed as a single string",
        "bar": "strings can also be quoted and contain \"escaped quotes\"",
        "baz": 15,
        "qux": "1.16",
        "isFoo": true,
        "isBar": false,
        "optional": null,
        "foofoo": "true",
        "foos": [
          "string1",
          "string2",
          "string3",
          42,
          true,
          false,
          null,
          "Hello, World!"
        ],
        "large": [
          "isNode",
          "isValue",
          "createRawNode",
          "getChildren",
          "getValue",
          "setValue",
          "remove",
          "add",
          "get",
          "42",
          42,
          true,
          "true",
          false,
          null,
          "string with spaces"
        ],
        "nested": [
          "isNode",
          "isValue",
          "createRawNode",
          "getChildren",
          "getValue",
          "setValue",
          "remove",
          "add",
          "get",
          [
            "string1",
            "string2",
            "string3"
          ],
          [
            "getParent",
            "lastChild",
            "nextSibling",
            "previousSibling",
            "siblings",
            "walk",
            "walkUp",
            "accepts",
            "atPath",
            "contains",
            "find",
            "findAll",
            "getMeta",
            "getPath",
            "hasChild"
          ],
          {
            "foo": true,
            "bar": false
          }
        ],
        "barbaz": {
          "foo": true,
          "bar": 3.1415
        }
      }
    }
  ]
]
```

### Multline string literals

Leading indentation up to the level of nesting is removed

#### input

```
heredocs>
  description: a heredoc syntax is supported for multiline strings
  /*
He thrusts his fists
   against the
  posts
and
        still
  insists he
            sees the ghosts
    */
  rhyme$
    He thrusts his fists
        against the
      posts

    and
            still
      insists he
                sees the ghosts
```

#### output

```json
[
  {
    "name": "heredocs",
    "model": {
      "description": "a heredoc syntax is supported for multiline strings",
      "rhyme": "He thrusts his fists\n    against the\n  posts\n\nand\n        still\n  insists he\n            sees the ghosts\n"
    }
  }
]
```

### As an object notation

Node tags aren't necessary, you can also parse literals:

#### input

```
{}
  foo: bar
  baz: qux
```

#### output

```json
{
  "foo": "bar",
  "baz": "qux"
}
```

### Syntax highlighting

A Visual Studio Code extension is available for syntax highlighting - TODO

Because Visual Studio Code uses TextMate grammars, you should be able to use it
in several other editors as well -
[the grammar can be found here](https://github.com/mojule/vscode-mmon)

Note that there are still some issues with the highlighting!
