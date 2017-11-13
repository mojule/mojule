'use strict'

const template = `
  <p attr="objectField">attr from object</p>
  <p attr="objectField">attr doesn't set context</p>
  <p attr="objectField"><text set="idField"></text></p>
  <p attr-id="idField">single attr</p>
  <p attr="objectField" attr-id="idField">mixed attr</p>
  <p attr="objectField" id="existingId" existing="existing">existing</p>
  <p attr="missing">missing object</p>
  <p attr-id="missing">missing field</p>
  <p attr-data-value="numberField">number field</p>
`

module.exports = template
