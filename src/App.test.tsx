import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import App from './App'
import configureStore from './configureStore'

test('renders main page of app', () => {
  const store = configureStore()

  const { getByText } = render(<Provider store={store}><App /></Provider>)
  const linkElement = getByText(/ai4h/i)
  expect(linkElement).toBeInTheDocument()
})
