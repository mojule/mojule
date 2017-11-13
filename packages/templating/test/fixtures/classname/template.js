'use strict'

const template = `
<classname set="classField">
  <p class="foo">class</p>
</classname>
<classname add="classField">
  <p class="foo">class add</p>
</classname>
<classname remove="classField">
  <p class="foo qux">class remove qux</p>
</classname>
<classname toggle="classField">
  <p class="foo qux">class toggle qux off</p>
</classname>
<classname toggle="classField">
  <p class="foo">class toggle qux on</p>
</classname>
<classname set="missing">
  <p>missing class</p>
</classname>
`

module.exports = template
