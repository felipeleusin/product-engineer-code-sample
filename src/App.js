import React from 'react'
import { Provider as ThemeProvider, Root, Container } from 'rebass'

import theme from '~/theme'

import SurveyForm from './components/SurveyForm'

const App = () => (
  <ThemeProvider theme={theme}>
    <Root>
      <Container>
        <SurveyForm />
      </Container>
    </Root>
  </ThemeProvider>
)

export default App
