'use strict'

const template = `
<context path="textField"><p><text></text></p></context>
<p>text: <text set="textField"></text></p>
<p>missing: <text set="missing"></text></p>
<p>number: <text set="numberField"></text></p>
<p>text: <text append="textField">append </text></p>
<p>text: <text prepend="textField"> prepend</text></p>
`

module.exports = template
