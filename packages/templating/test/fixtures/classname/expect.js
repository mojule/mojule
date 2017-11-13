'use strict'

const expect = `
  <p class="qux">class</p>
  <p class="foo qux">class add</p>
  <p class="foo">class remove qux</p>
  <p class="foo">class toggle qux off</p>
  <p class="foo qux">class toggle qux on</p>
  <p class="">missing class</p>
`

module.exports = expect
