'use strict'

const template = `
<div each="eachField">
  <text></text>
</div>
<div each="eachField2">
  <p>
    <text set="firstName"></text>
    <text set="lastName"></text>
  </p>
</div>
<div each="eachField2">
  <include name="person"></include>
</div>
<div each="nestedField">
  <div class="row" each>
    <div class="column" each><text></text></div>
  </div>
</div>
<div each="missing">
  <p>missing</p>
</div>

<div each-object="eachObject">
  <section>
    <h1 text="$key"></h1>
    <if string=".">
      <p text="."></p>
    </if>
    <if object=".">
      <div each-object=".">
        <h2 text="$key"></h2>
        <p text="."></p>
      </div>
    </if>
  </section>
</div>
`

module.exports = template
