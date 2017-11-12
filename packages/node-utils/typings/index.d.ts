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
  Wraps the provided wrapper node around the provided node, and replaces the
  provided node within the tree.
*/
export function wrap( node: Node, wrapper: ParentNode ): Node

/**
  Removes the provided node from the tree and replaces it with its children.
*/
export function unwrap( node: Node ): Node
