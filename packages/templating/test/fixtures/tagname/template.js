'use strict'

const template = `
<tagname set="tagnameField">
  <h1 class="foo">should be h2</h1>
</tagname>
<tagname set="missing">
  <h1 class="foo">should be h1</h1>
</tagname>
<tag tagname="h2" class="foo">should be h2</tag>
`

module.exports = template
