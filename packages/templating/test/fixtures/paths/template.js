'use strict'

const template = `
  <context path="eachField">
    <context path="0">
      <p><text></text></p>
    </context>
  </context>
  <context path="eachField2">
    <context path="0">
      <p><text set="firstName"></text></p>
      <context path="../1">
        <p><text set="firstName"></text></p>
        <context path="/firstName">
          <p><text></text></p>
        </context>
      </context>
    </context>
  </context>
  <context path="eachField2/0/firstName">
    <p><text></text></p>
  </context>
  <context path="nestedField/0/0/0">
    <p><text></text></p>
  </context>
`

module.exports = template
