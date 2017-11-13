'use strict'

const template = `
<template id="first">
  <p text="stringField"></p>
</template>
<template id="second">
  <div include="first"></div>
</template>
`

module.exports = template