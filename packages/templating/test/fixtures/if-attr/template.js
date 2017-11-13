'use strict'

const template = `
<p if="trueField">has trueField</p>
<p if-false="falseField">falseField === false</p>
<p if="trueField" if-true="trueField" if-false="falseField">every truthy field was true</p>
<p if="trueField" if-true="falseField" if-false="falseField">a falsy field was true</p>
<p if="missing">has missing</p>
`

module.exports = template
