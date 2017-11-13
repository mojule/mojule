'use strict'

const model = {
  value: 'Grandparent 1',
  children: [
    {
      value: 'Parent 1',
      children: []
    },
    {
      value: 'Parent 2',
      children: [
        {
          value: 'Child 1',
          children: []
        }
      ]
    }
  ]
}

module.exports = model
