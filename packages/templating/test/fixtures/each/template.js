'use strict'

const template = `
<each array="eachField">
  <text></text>
</each>
<each array="eachField2">
  <p>
    <text set="firstName"></text>
    <text set="lastName"></text>
  </p>
</each>
<each array="eachField2">
  <include name="person"></include>
</each>
<div>
  <each array="nestedField">
    <div class="row">
      <each>
        <div class="column"><each><text></text></each></div>
      </each>
    </div>
  </each>
</div>
<each array="missing">
  <p>missing</p>
</each>

<each object="eachObject">
  <section>
    <h1 text="$key"></h1>
    <if string=".">
      <p text="."></p>
    </if>
    <if object=".">
      <each object=".">
        <h2 text="$key"></h2>
        <p text="."></p>
      </each>
    </if>
  </section>
</each>
`

module.exports = template
