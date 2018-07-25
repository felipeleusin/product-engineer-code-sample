import React, { Component } from 'react'
import { Flex, Box, Heading, Button, Message, Input, Label, Text } from 'rebass'
import styled from 'styled-components'

import { client, createRequest } from '~/api'

import LocalePicker from '../LocalePicker'

const SubmitButton = styled(Button)`
  display: block;
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
`

export default class SurveyForm extends Component {
  static propTypes = {}

  state = { name: '', locale: '', created: false, submitting: false, error: null }

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name, locale } = this.state
    if (!name || !locale) {
      this.setState({ error: 'Please fill in all fields' })
      return
    }

    this.setState({ submitting: true, error: null })

    client
      .post('/surveys', { ...createRequest, name, locale })
      .then(() => {
        this.setState({ created: true, submitting: false })
      })
      .catch(error => {
        const { response } = error
        this.setState({
          submitting: false,
          error: response.data.errors
            .reduce((errors, error) => [error.message, ...errors], [])
            .join(', '),
        })
      })
  }

  render() {
    const { name, locale, error, created, submitting } = this.state

    if (created) {
      return (
        <Flex flexDirection="column">
          <Heading textAlign="center" mt={5} mb={5}>
            Survey created!
          </Heading>
        </Flex>
      )
    }

    return (
      <Flex flexDirection="column">
        <Heading textAlign="center" mt={5} mb={5}>
          Create a Survey
        </Heading>
        <form method="POST" onSubmit={this.handleSubmit}>
          <Box mb={3}>
            <Label htmlFor="name-input">
              Name{' '}
              <Text is="p" color="red">
                *
              </Text>
            </Label>
            <Input
              name="name"
              id="name-input"
              type="text"
              required
              value={name}
              onChange={this.handleChange}
            />
          </Box>
          <Box mb={3}>
            <Label htmlFor="locale-input">
              Locale<Text is="p" color="red">
                *
              </Text>
            </Label>
            <LocalePicker
              id="locale-input"
              name="locale"
              value={locale}
              required
              onChange={this.handleChange}
            />
          </Box>
          {error ? (
            <Message mb={3} bg="red" color="white">
              {error}
            </Message>
          ) : null}
          <SubmitButton type="submit" disabled={submitting}>
            {submitting ? 'Creating survery...' : 'Create Survey'}
          </SubmitButton>
        </form>
      </Flex>
    )
  }
}
