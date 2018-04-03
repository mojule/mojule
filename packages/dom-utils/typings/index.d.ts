/**
  Calls the provided cb function for each inclusive descendant of the provided
  node in depth-first order. If cb returns a truthy value, the traversal is
  terminated early.
*/
export function walk( node: Node, cb : ( current: Node ) => any ): void

/**
  Calls the provided cb function for each inclusive ancestor of the provided
  node, starting from the provided node and moving upwards to the root. If cb
  returns a truthy value, the traversal is terminated early.
*/
export function walkUp( node: Node, cb : ( current: Node ) => any ): void

/**
  Calls the provided cb function for each inclusive descendant of the provided
  node that matches the predicate in depth-first order.
*/
export function walkEvery( node: Node, predicate: ( current: Node ) => boolean, cb: ( current: Node ) => void ): void

/*
  Calls the provided cb for each exclusive descendent of the provided node that
  matches the predicate in depth-first order, halting traversal along each path
  if a descendant is found.
*/
export function walkDescendants( node: Node, predicate: ( current: Node ) => boolean, cb: ( current: Node ) => void ): void

/*
  Returns an array of each exclusive descendent of the provided node that
  matches the predicate in depth-first order, halting traversal along each path
  if a descendant is found.
*/
export function findDescendants( node: Node, predicate: ( current: Node ) => boolean ): Node[]

/**
  Returns the first inclusive descendant of the provided node that satisfies the
  provided predicate function, seaching in depth-first order. If no match is
  found it returns undefined.
*/
export function find( node: Node, predicate: ( current: Node ) => boolean ): Node

/**
  Returns an array of all inclusive descendants of the provided node that
  satisfy the provided predicate function, searching in depth-first order.
*/
export function filter( node: Node, predicate: ( current: Node ) => boolean ): Node[]

/**
  Removes all children of the provided node, and returns them in an array.
*/
export function removeAll( node: ParentNode ): ChildNode[]

/**
  Returns the first inclusive descendant of the provided node that matches the
  provided selector. If no node is found, returns null. Like querySelector,
  except will return the initial node if it matches.
*/
export function select( node: Node, selector: string ): Node

/**
  Returns an array of every inclusive descendant of the provided node that
  matches the provided selector. Like querySelectorAll, except will return the
  initial node if it matches, and returns an array rather than a NodeList.
*/
export function selectAll( node: Node, selector: string ): Node[]

/**
  Wraps the provided wrapper node around the provided node, and replaces the
  provided node within the DOM tree.
*/
export function wrap( node: Node, wrapper: ParentNode ): Node

/**
  Removes the provided node from the DOM tree and replaces it with its children.
*/
export function unwrap( node: Node ): Node

/**
  Returns a boolean if the node is a text node and contains only spaces, tabs
  or newlines.
*/
export function isWhitespaceNode( node: Node ): boolean

/**
  Traverses the DOM from the provided node in inclusive depth-first order and
  removes any text nodes that contain only spaces, tabs or newlines.
 */
export function removeWhitespace( node: Node ): void

/**
  Calls Node.normalize, then traverses the DOM from the provided node in
  inclusive depth-first order and collapses all instances of consecutive
  whitespace within text nodes to a single space.
*/
export function normalizeWhitespace( node: Node ): void

/**
  Parses the HTML str and returns either a single node, or a document fragment
  if the string contains multiple nodes.
*/
export function parse( document: HTMLDocument, str: string ): Node

/**
  Returns an HTML string representation of the node.
*/
export function stringify( node: Node ): string

export type AttributeMap = { [ name: string ]: string }

/**
  Gets the attributes for a node as an object map.
*/
export function getAttributes( node: HTMLElement ): AttributeMap

/**
  Sets the attributes for a node from an object map.
*/
export function setAttributes( node: HTMLElement, attributes: AttributeMap ): void

export type SerializedValue = string | AttributeMap | SerializedArray

export interface SerializedArray extends Array<SerializedValue> { }

export type SerializedNode = string | SerializedArray

/**
  Serializes the node to a JSON compatible object using a structure similar to
  JSONML.
*/
export function serialize( node: Node ): SerializedNode

/**
  Creates a DOM node from a JSON compatible object using a structure similar to
  JSONML.
*/
export function deserialize( document: HTMLDocument, value: SerializedNode ): Node

/**
  Iterates over each attribute on an element and calls the provided callback
  with the current attribute and index
*/
export function eachAttribute( node: HTMLElement, callback: ( current: { name: string, value: string }, index: number ) => boolean | void ): void

/**
  Replaces the provided element with a new element that has the provided tagName
  and the attributes and children of the original element
*/
export function rename( document: HTMLDocument, node: HTMLElement, tagName: string ) : HTMLElement

/**
  Removes all the children of the provided element and returns them in an array
*/
export function empty( node: ParentNode ) : Node[]

/**
  calls ParentNode.querySelector and either throws if no result or returns the
  node
*/
export function strictSelect( el: Element | Document | DocumentFragment, selector: string ): Node

/**
  calls Element.getAttribute and either throws if no result or returns the
  string value
*/
export function strictGetAttribute( el: Element, attributeName: string ): string
