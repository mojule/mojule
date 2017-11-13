'use strict'

const template = `
<context path="textField"><p text></p></context>
<p text="textField">remove this</p>
<p text-set="textField">remove this</p>
<p text-append="textField">text: </p>
<p text-prepend="textField"> text</p>
<p text="missing">remove this</p>
`

module.exports = template
