'use strict'

const template = `
  <attr set="objectField">
    <p>attr from object</p>
  </attr>
  <attr set="objectField">
    <p>attr doesn't set context</p>
    <p><text set="idField"></text></p>
  </attr>
  <attr id="idField">
    <p>single attr</p>
  </attr>
  <attr set="objectField" id="idField">
    <p>mixed attr</p>
  </attr>
  <attr set="objectField">
    <p id="existingId" existing="existing">existing</p>
  </attr>
  <attr set="missing">
    <p>missing object</p>
  </attr>
  <attr id="missing">
    <p>missing field</p>
  </attr>
  <attr data-value="numberField">
    <p>number field</p>
  </attr>
`

module.exports = template
