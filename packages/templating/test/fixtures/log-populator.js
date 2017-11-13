'use strict'

const log = []

const logActions = ({ populateAction }) => {
  log.push( populateAction )
}

const Populator = populator =>
  value => {
    logActions( value )

    return populator( value )
  }

Populator.log = log

module.exports = Populator
