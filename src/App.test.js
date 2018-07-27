import React from 'react'
import { render } from 'react-testing-library'

import App from './App'

describe('<App />', () => {
  const { container } = render(<App />)

  expect(container).toBeInTheDocument()
})
