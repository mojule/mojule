'use strict'

const expect = `
<div> foo bar baz </div>
<div>
  <p>
    Nik
    Coughlin
  </p>
  <p>
    Bob
    McBobface
  </p>
</div>
<div>
  <div class="person">
    <p>
      Nik
      Coughlin
    </p>
  </div>
  <div class="person">
    <p>
      Bob
      McBobface
    </p>
  </div>
</div>
<div>
  <div class="row">
    <div class="column">A0</div>
    <div class="column">A1</div>
    <div class="column">A2</div>
  </div>
  <div class="row">
    <div class="column">B0</div>
    <div class="column">B1</div>
    <div class="column">B2</div>
  </div>
  <div class="row">
    <div class="column">C0</div>
    <div class="column">C1</div>
    <div class="column">C2</div>
  </div>
</div>
<div></div>

<div>
  <section>
    <h1>foo</h1>
    <p>Foo</p>
  </section>
  <section>
    <h1>bar</h1>
    <div>
      <h2>bar1</h2>
      <p>Bar 1</p>
      <h2>bar2</h2>
      <p>Bar 2</p>
    </div>
  </section>
</div>
`

module.exports = expect
