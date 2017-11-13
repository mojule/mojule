'use strict'

const template = `
<include name="person"></include>
<include name="missing"></include>
<each array="eachIncludeField">
  <include name="person">this should be removed</include>
</each>
`

module.exports = template
