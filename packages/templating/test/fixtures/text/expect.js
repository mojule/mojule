'use strict'

const expect = `
<p>&lt;b&gt;text&lt;/b&gt;</p>
<p>text: &lt;b&gt;text&lt;/b&gt;</p>
<p>missing: </p>
<p>number: 42</p>
<p>text: append &lt;b&gt;text&lt;/b&gt;</p>
<p>text: &lt;b&gt;text&lt;/b&gt; prepend</p>
`

module.exports = expect
