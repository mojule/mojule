'use strict'

const template = `
<context path="rawField"><p><raw></raw></p></context>
<p>raw: <raw set="rawField"></raw></p>
<p>missing: <raw set="missing"></raw></p>
<p>number: <raw set="numberField"></raw></p>
<p>raw: <raw append="rawField">append </raw></p>
<p>raw: <raw prepend="rawField"> prepend</raw></p>
`

module.exports = template
