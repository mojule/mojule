'use strict'

const expect = `
  <p id="objectId" name="objectName">attr from object</p>
  <p id="objectId" name="objectName">attr doesn't set context</p>
  <p id="objectId" name="objectName">fieldId</p>
  <p id="fieldId">single attr</p>
  <p id="fieldId" name="objectName">mixed attr</p>
  <p id="objectId" existing="existing" name="objectName">existing</p>
  <p>missing object</p>
  <p id="">missing field</p>
  <p data-value="42">number field</p>
`

module.exports = expect
