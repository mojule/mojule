'use strict'

const template = `
<context path="rawField"><p raw></p></context>
<p raw="rawField">remove this</p>
<p raw-set="rawField">remove this</p>
<p raw-append="rawField">raw: </p>
<p raw-prepend="rawField"> raw</p>
<p raw="missing">remove this</p>
`

module.exports = template
