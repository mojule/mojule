'use strict'

const template = `
<not true="trueField">
  <p>trueField !== true</p>
</not>
<not false="falseField">
  <p>falseField !== false</p>
</not>
<not array="arrayField">
  <p>arrayField not array</p>
</not>
<not array-empty="emptyArrayField">
  <p>emptyArrayField not empty array</p>
</not>
<not object="objectField">
  <p>objectField not object</p>
</not>
<not object-empty="emptyObjectField">
  <p>emptyObjectField not empty object</p>
</not>
<not string="stringField">
  <p>stringField not string</p>
</not>
<not string-empty="emptyStringField">
  <p>emptyStringField not empty string</p>
</not>
<not number="numberField">
  <p>numberField not number</p>
</not>
<not number-zero="numberZeroField">
  <p>numberZeroField not zero</p>
</not>
<not number-negative="numberNegativeField">
  <p>numberNegativeField not negative number</p>
</not>
<not number-integer="numberIntegerField">
  <p>numberIntegerField not integer</p>
</not>
<not null="nullField">
  <p>nullField not null</p>
</not>

<not has="missing">
  <p>does not have missing</p>
</not>
<not has="missing" true="falseField" false="trueField">
  <p>all fields were false</p>
</not>
<not has="missing" true="falseField" false="falseField">
  <p>all fields were not false</p>
</not>

<not true="falseField">
  <p>falseField !== true</p>
</not>
<not false="trueField">
  <p>trueField !== false</p>
</not>
<not array="falseField">
  <p>falseField not array</p>
</not>
<not array-empty="falseField">
  <p>falseField not empty array</p>
</not>
<not object="falseField">
  <p>falseField not object</p>
</not>
<not object-empty="falseField">
  <p>falseField not empty object</p>
</not>
<not string="falseField">
  <p>falseField not string</p>
</not>
<not string-empty="falseField">
  <p>falseField not empty string</p>
</not>
<not number="falseField">
  <p>falseField not number</p>
</not>
<not number-zero="falseField">
  <p>falseField not zero</p>
</not>
<not number-negative="falseField">
  <p>falseField not negative number</p>
</not>
<not number-integer="falseField">
  <p>falseField not integer</p>
</not>
<not null="falseField">
  <p>falseField not null</p>
</not>
`

module.exports = template
