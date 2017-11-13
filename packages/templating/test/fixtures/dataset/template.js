'use strict'

const template = `
<dataset set="datasetField">
  <p>dataset</p>
</dataset>
<dataset first-name="firstNameField">
  <p>dataset single</p>
</dataset>
<dataset set="datasetField" first-name="firstNameField">
  <p>dataset mixed</p>
</dataset>
<dataset set="missing" first-name="missing">
  <p>dataset missing</p>
</dataset>
`

module.exports = template
