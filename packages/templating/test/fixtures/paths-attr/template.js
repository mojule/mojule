'use strict'

const template = `
  <div path="eachField">
    <div path="0">
      <p><text></text></p>
    </div>
  </div>
  <div path="eachField2">
    <div path="0">
      <p><text set="firstName"></text></p>
      <div path="../1">
        <p><text set="firstName"></text></p>
        <div path="/firstName">
          <p><text></text></p>
        </div>
      </div>
    </div>
  </div>
  <div path="eachField2/0/firstName">
    <p><text></text></p>
  </div>
  <div path="nestedField/0/0/0">
    <p><text></text></p>
  </div>
`

module.exports = template
