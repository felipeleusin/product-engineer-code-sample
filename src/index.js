/* eslint-disable global-require */
import React from 'react'
import { render } from 'react-dom'

const rootNode = document.getElementById('root')
const renderApp = () => {
  const App = require('./App').default

  render(<App />, rootNode)
}

renderApp()

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp()
  })
}
