import React, { Component } from 'react'
import { Select } from 'rebass'

import { client } from '~/api'

export default class LocalePicker extends Component {
  state = { locales: null, error: null }

  componentDidMount() {
    client
      .get('/locales')
      .then(response => {
        this.setState({ locales: response.data.result })
      })
      .catch(error => {
        this.setState({ error: error.response.data.message })
      })
  }

  render() {
    const { locales, error } = this.state

    return (
      <Select {...this.props} disabled={!locales || error}>
        {locales ? (
          locales.map(locale => (
            <option key={locale.code} value={locale.code}>
              {locale.name}
            </option>
          ))
        ) : error ? (
          <option value="">{error}</option>
        ) : (
          <option value="">Loading...</option>
        )}
      </Select>
    )
  }
}
