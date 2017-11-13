'use strict'

const template = `
<if has="trueField">
  <p>trueField is defined</p>
</if>
<if truthy="trueField">
  <p>trueField is truthy</p>
</if>
<if falsy="falseField">
  <p>falseField is falsy</p>
</if>
<if boolean="falseField">
  <p>falseField boolean</p>
</if>
<if true="trueField">
  <p>trueField === true</p>
</if>
<if false="falseField">
  <p>falseField === false</p>
</if>
<if array="arrayField">
  <p>arrayField is array</p>
</if>
<if array-empty="emptyArrayField">
  <p>emptyArrayField is empty array</p>
</if>
<if object="objectField">
  <p>objectField is object</p>
</if>
<if object-empty="emptyObjectField">
  <p>emptyObjectField is empty object</p>
</if>
<if string="stringField">
  <p>stringField is string</p>
</if>
<if string-empty="emptyStringField">
  <p>emptyStringField is empty string</p>
</if>
<if number="numberField">
  <p>numberField is number</p>
</if>
<if number-zero="numberZeroField">
  <p>numberZeroField is zero</p>
</if>
<if number-negative="numberNegativeField">
  <p>numberNegativeField is negative number</p>
</if>
<if number-integer="numberIntegerField">
  <p>numberIntegerField is integer</p>
</if>
<if null="nullField">
  <p>nullField is null</p>
</if>

<if has="trueField" true="trueField" false="falseField">
  <p>every truthy field was true</p>
</if>
<if has="trueField" true="falseField" false="falseField">
  <p>a falsy field was true</p>
</if>

<if boolean="stringField">
  <p>stringField boolean</p>
</if>
<if has="missing">
  <p>has missing</p>
</if>
<if true="falseField">
  <p>falseField === true</p>
</if>
<if false="trueField">
  <p>trueField === false</p>
</if>
<if array="falseField">
  <p>falseField is array</p>
</if>
<if array-empty="falseField">
  <p>falseField is empty array</p>
</if>
<if object="falseField">
  <p>falseField is object</p>
</if>
<if object-empty="falseField">
  <p>falseField is empty object</p>
</if>
<if string="falseField">
  <p>falseField is string</p>
</if>
<if string-empty="falseField">
  <p>falseField is empty string</p>
</if>
<if number="falseField">
  <p>falseField is number</p>
</if>
<if number-zero="falseField">
  <p>falseField is zero</p>
</if>
<if number-negative="falseField">
  <p>falseField is negative number</p>
</if>
<if number-integer="falseField">
  <p>falseField is integer</p>
</if>
<if null="falseField">
  <p>falseField is null</p>
</if>
`

module.exports = template
