'use strict'

const size = ({ api, state, Api }) => {
  api.width = () => Api.getWidth( state.rows )
  api.height = () => Api.getHeight( state.rows )

  api.size = () => ({
    width: Api.getWidth( state.rows ),
    height: Api.getHeight( state.rows )
  })
}

module.exports = size
