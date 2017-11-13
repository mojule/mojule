'use strict'

const template = `
<p classname="classField" class="foo">class</p>
<p classname-add="classField" class="foo">class add</p>
<p classname-remove="classField" class="foo qux">class remove qux</p>
<p classname-toggle="classField" class="foo qux">class toggle qux off</p>
<p classname-toggle="classField" class="foo">class toggle qux on</p>
<p classname="missing">missing class</p>
`

module.exports = template
