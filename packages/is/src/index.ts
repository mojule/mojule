import { is } from './is'
import { Predicates } from './types'

/*
  We add the custom predicates twice - first time, so that their key order is
  retained, then we add the defaults, then we add the custom predicates again
  in case any of them are supposed to override a default predicate
*/
const extendDefaults = ( predicates: Predicates ): Predicates =>
  Object.assign( {}, predicates, is, predicates )

const Utils = ( predicates: Predicates ) => {
  const keys = Object.keys( predicates )

  const isType = ( subject: any, typename: string ) =>
    predicates[ typename ] && predicates[ typename ]( subject )

  const isOnly = ( subject: any, typename: string ) =>
    isType( subject, typename ) && allOf( subject ).length === 1

  const some = ( subject: any, ...typenames: string[] ) =>
    typenames.some( typename => isType( subject, typename ) )

  const every = ( subject: any, ...typenames: string[] ) =>
    typenames.every( typename => isType( subject, typename ) )

  const _of = ( subject: any ) =>
    keys.find( key => isType( subject, key ) )

  const allOf = ( subject: any ) =>
    keys.filter( key => isType( subject, key ) )

  const types = () => keys.slice()

  return { isType, isOnly, some, every, of: _of, allOf, types }
}

const utils = Utils( is )

const Is = { is, extendDefaults, utils, Utils }

export = Is
