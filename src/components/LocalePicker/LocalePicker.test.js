import React from 'react'
import { render, wait } from 'react-testing-library'
import mockAxios from 'axios'

import LocalePicker from './index'

describe('<LocalePicker />', () => {
  describe('on api success', () => {
    it('should load locales', async () => {
      mockAxios.get.mockResolvedValueOnce({ data: { result: [{ code: 'en', name: 'English' }] } })

      const { getByText, container } = render(<LocalePicker />)

      await wait(() => expect(container.disabled).toBeFalsy())

      expect(mockAxios.get).toHaveBeenCalledTimes(1)
      expect(getByText('English')).toBeInTheDocument()
    })
  })

  describe('on api error', () => {
    it('should show error message', async () => {
      const message = 'Error!'

      const { getByText } = render(<LocalePicker />)

      const error = new Error()
      error.response = { data: { message } }
      mockAxios.mockError(error)

      await wait(() => expect(mockAxios.get).toHaveBeenCalledTimes(1))

      expect(getByText(message)).toBeInTheDocument()
    })
  })
})
