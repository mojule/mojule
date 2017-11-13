'use strict'

const template = `
<classes set="classField">
  <p class="foo">class</p>
</classes>
<classes add="classField">
  <p class="foo">class add</p>
</classes>
<classes remove="classField">
  <p class="foo bar qux">class remove</p>
</classes>
<classes toggle="classField">
  <p class="foo bar qux">class toggle off</p>
</classes>
<classes toggle="classField">
  <p class="foo">class toggle on</p>
</classes>
<classes set="missing">
  <p>missing classes</p>
</classes>
`

module.exports = template
