import React from 'react'
import {
  render,
  getByAltText as getByAltTextUnbound,
} from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'

import App from './App'
import configureStore from './configureStore'

test('renders main page of app', () => {
  const store = configureStore()

  const { container } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </Provider>,
  )
  const main = container.querySelector('main')
  const logoElement = getByAltTextUnbound(main, /FG AI4H logo/i)
  expect(logoElement).toBeInTheDocument()
})
