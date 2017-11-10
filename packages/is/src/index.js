'use strict'

const defaultPredicates = require( './default-predicates' )

const Is = ( predicates = defaultPredicates ) => {
  /*
    weird triple assign is so that custom predicate keys come before defaults
    so that user predicates always take precedence over defaults
  */
  if( predicates !== defaultPredicates )
    predicates = Object.assign( {}, predicates, defaultPredicates, predicates )

  const t = T( predicates )

  return t.types().reduce( ( is, name ) => {
    is[ name ] = value => t.is( value, name )

    return is
  }, t )
}

const T = typePredicates => {
  const keys = Object.keys( typePredicates )

  const is = ( subject, typename ) =>
    typePredicates[ typename ] && typePredicates[ typename ]( subject )

  const isOnly = ( subject, typename ) =>
    is( subject, typename ) && allOf( subject ).length === 1

  const some = ( subject, ...typenames ) =>
    typenames.some( typename => is( subject, typename ) )

  const every = ( subject, ...typenames ) =>
    typenames.every( typename => is( subject, typename ) )

  const _of = subject =>
    keys.find( key => is( subject, key ) )

  const allOf = subject =>
    keys.filter( key => is( subject, key ) )

  const types = () => keys.slice()

  return { is, isOnly, some, every, of: _of, allOf, types }
}

Object.assign( Is, Is() )

module.exports = Is
