'use strict'

const template = `
<p classes="classField" class="foo">class</p>
<p classes-add="classField" class="foo">class add</p>
<p classes-remove="classField" class="foo bar qux">class remove</p>
<p classes-toggle="classField" class="foo bar qux">class toggle off</p>
<p classes-toggle="classField" class="foo">class toggle on</p>
<p classes-set="missing">missing classes</p>
`

module.exports = template
