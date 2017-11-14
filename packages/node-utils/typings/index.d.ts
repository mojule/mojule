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
  Returns the first child of the provided node that satisfies the provided
  predicate function. If no match is found it returns undefined.
*/
export function findChild( node: Node, predicate: ( current: Node ) => boolean ): Node

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
  Wraps the provided wrapper node around the provided node, and replaces the
  provided node within the tree.
*/
export function wrap( node: Node, wrapper: ParentNode ): Node

/**
  Removes the provided node from the tree and replaces it with its children.
*/
export function unwrap( node: Node ): Node

/**
  Returns the root of the current node
*/
export function root( node: Node ): Node

/**
  Returns the index of the provided node within its parent, or undefined if the
  provided node has no parent
*/
export function indexOf( node: Node ): number

/**
  Returns a string for the current node which is guaranteed to be unique among
  its siblings
*/
export function slug( node: Node ): string

/**
  Returns the path for the current node relative to the root of the tree. The
  path is composed of all ancestors' slugs separated by /
*/
export function path( node: Node ): string

/**
  Returns the node at the indicated path, relative to the provided node, or
  undefined if no node exists at that path. Use the root of the tree as the
  provided node if using an absolute path
*/
export function atPath( node: Node, path: string ): Node
