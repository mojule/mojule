'use strict'

const template = `
<tag tagname="h1">Main Header</tag>
<tagname set="subheaderTag"><h3>Sub Header</h3></tagname>
<if array="people">
  <div classname="peopleClass" attr-data-foo="peopleDataFoo" each="people">
    <section classes="../../sectionClasses">
      <include name="person"></include>
      <p dataset=".">
    </section>
  </div>
</if>
<not array="people">
  <p>No people found!</p>
</not>
`

module.exports = template
