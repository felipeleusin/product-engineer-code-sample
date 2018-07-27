import React from 'react'
import { render, fireEvent, wait, waitForElement } from 'react-testing-library'
import mockAxios from 'axios'

import SurveyForm from './index'

describe('<SurveryForm />', () => {
  it('should include form components', () => {
    const { getByLabelText } = render(<SurveyForm />)

    const nameInput = getByLabelText(/name/i)
    const localeInput = getByLabelText(/locale/i)

    expect(nameInput).toBeInTheDocument()
    expect(localeInput).toBeInTheDocument()
  })

  it('should show error on empty submit', () => {
    const { getByText } = render(<SurveyForm />)

    const button = getByText('Create Survey')

    fireEvent.click(button)

    expect(getByText('Please fill in all fields')).toBeInTheDocument()
  })

  describe('with values', () => {
    it('should disable the submit button', async () => {
      mockAxios.get.mockResolvedValueOnce({ data: { result: [{ code: 'en', name: 'English' }] } })

      const { getByText, getByLabelText } = render(<SurveyForm />)

      const button = getByText('Create Survey')
      const nameInput = getByLabelText(/name/i)
      const localeInput = getByLabelText(/locale/i)

      await wait(() => expect(mockAxios.get).toHaveBeenCalledTimes(1))

      mockAxios.post.mockResolvedValueOnce({ data: { result: [{ code: 'en', name: 'English' }] } })

      nameInput.value = 'Survey Name'
      fireEvent.change(nameInput)
      localeInput.value = 'en'
      fireEvent.change(localeInput)
      fireEvent.click(button)

      expect(button.disabled).toBeTruthy()
    })

    it('should call submit', async () => {
      mockAxios.get.mockResolvedValueOnce({ data: { result: [{ code: 'en', name: 'English' }] } })

      const { getByText, getByLabelText } = render(<SurveyForm />)

      await wait(() => expect(mockAxios.get).toHaveBeenCalledTimes(1))

      mockAxios.post.mockResolvedValueOnce({ id: '123152' })

      const button = getByText('Create Survey')
      const nameInput = getByLabelText(/name/i)
      const localeInput = getByLabelText(/locale/i)

      nameInput.value = 'Survey Name'
      fireEvent.change(nameInput)
      localeInput.value = 'en'
      fireEvent.change(localeInput)
      fireEvent.click(button)

      expect(mockAxios.post).toHaveBeenCalledTimes(1)
    })

    describe('with api success', () => {
      it('should display message', async () => {
        mockAxios.get.mockResolvedValueOnce({ data: { result: [{ code: 'en', name: 'English' }] } })

        const { getByText, getByLabelText } = render(<SurveyForm />)

        const button = getByText('Create Survey')
        const nameInput = getByLabelText(/name/i)
        const localeInput = getByLabelText(/locale/i)

        await wait(() => expect(mockAxios.get).toHaveBeenCalledTimes(1))

        mockAxios.post.mockResolvedValueOnce({ id: '123152' })

        nameInput.value = 'Survey Name'
        fireEvent.change(nameInput)
        localeInput.value = 'en'
        fireEvent.change(localeInput)
        fireEvent.click(button)

        await waitForElement(() => getByText(/created/i))

        expect(getByText(/created/i)).toBeInTheDocument()
      })
    })
    describe('with api error', () => {
      it('should display message', async () => {
        mockAxios.get.mockResolvedValueOnce({ data: { result: [{ code: 'en', name: 'English' }] } })

        const { getByText, getByLabelText } = render(<SurveyForm />)

        const button = getByText('Create Survey')
        const nameInput = getByLabelText(/name/i)
        const localeInput = getByLabelText(/locale/i)

        await wait(() => expect(mockAxios.get).toHaveBeenCalledTimes(1))

        nameInput.value = 'Invalid Name'
        fireEvent.change(nameInput)
        localeInput.value = 'en'
        fireEvent.change(localeInput)
        fireEvent.click(button)

        const error = new Error()
        error.response = { data: { errors: [{ message: 'Error!' }] } }
        mockAxios.mockError(error)

        await waitForElement(() => getByText(/error/i))

        expect(getByText(/error/i)).toBeInTheDocument()
      })
    })
  })
})
