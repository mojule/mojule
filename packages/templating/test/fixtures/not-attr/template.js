'use strict'

const template = `
<p not-true="falseField">falseField !== true</p>
<p not="missing" not-true="falseField">all not conditions met</p>
<p not="missing" not-true="trueField" not-false="trueField">a not condition was true</p>
<p not="missing">does not have missing</p>
`

module.exports = template
