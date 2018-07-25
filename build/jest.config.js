/* eslint-disable import/no-extraneous-dependencies */
// import 'jest-styled-components'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import mockAxios from 'jest-mock-axios'

afterEach(() => {
  mockAxios.reset()
})
