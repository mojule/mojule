'use strict'

const Async = fn =>
  ( ...args ) => {
    const callback = args.pop()

    let result
    try {
      result = fn( ...args )
    } catch( e ){
      setImmediate( () => callback( e ) )

      return
    }

    setImmediate( () => callback( null, result ) )
  }

module.exports = Async
