'use strict'

const template = `
<p dataset="datasetField">dataset</p>
<p dataset-first-name="firstNameField">dataset single</p>
<p dataset="datasetField" dataset-first-name="firstNameField">dataset mixed</p>
<p dataset="missing" dataset-first-name="missing">dataset missing</p>
`

module.exports = template
