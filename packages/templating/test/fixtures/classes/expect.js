'use strict'

const expect = `
  <p class="bar qux">class</p>
  <p class="foo bar qux">class add</p>
  <p class="foo">class remove</p>
  <p class="foo">class toggle off</p>
  <p class="foo bar qux">class toggle on</p>
  <p class="">missing classes</p>
`

module.exports = expect
