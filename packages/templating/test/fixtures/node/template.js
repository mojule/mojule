'use strict'

const template = `
<li>
  <text set="value"></text>
  <ul>
    <each array="children">
      <include name="node"></include>
    </each>
  </ul>
</li>
`

module.exports = template