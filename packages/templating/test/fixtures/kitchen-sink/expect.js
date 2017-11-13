'use strict'

const expect = `
  <h1>Main Header</h1>
  <h2>Sub Header</h2>
  <div class="people-cards" data-foo="bar">
    <section class="foo bar">
      <div class="person">
        <p> Nik Coughlin </p>
      </div>
      <p data-first-name="Nik" data-last-name="Coughlin"></p>
    </section>
    <section class="foo bar">
      <div class="person">
        <p> Jane McBobface </p>
      </div>
      <p data-first-name="Jane" data-last-name="McBobface"></p>
    </section>
  </div>
`

module.exports = expect