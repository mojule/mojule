'use strict'

const expect = `
<ul class="nested">
  <li>
    Grandparent 1
    <ul>
      <li>
        Parent 1
        <ul></ul>
      </li>
      <li>
        Parent 2
        <ul>
          <li>
            Child 1
            <ul></ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

`

module.exports = expect