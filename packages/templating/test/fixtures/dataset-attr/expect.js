'use strict'

const expect = `
  <p data-first-name="Nik" data-last-name="Coughlin">dataset</p>
  <p data-first-name="Bob">dataset single</p>
  <p data-first-name="Bob" data-last-name="Coughlin">dataset mixed</p>
  <p data-first-name="">dataset missing</p>
`

module.exports = expect
