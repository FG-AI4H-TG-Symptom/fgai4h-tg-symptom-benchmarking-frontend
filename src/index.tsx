import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'

import { StylesProvider, ThemeProvider } from '@material-ui/core/styles'

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import configureStore from './configureStore'
import theme from './theme'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StylesProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
