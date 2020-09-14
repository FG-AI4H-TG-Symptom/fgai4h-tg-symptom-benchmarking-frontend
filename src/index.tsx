import 'typeface-roboto';

import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from './App';
import configureStore from './configureStore';
import * as serviceWorker from './serviceWorker';
import { useTheme } from './theme';

const store = configureStore();

const Providers: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <Provider store={store}>
        <Router>
          <StylesProvider injectFirst>
            <MuiThemeProvider theme={theme}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
              </ThemeProvider>
            </MuiThemeProvider>
          </StylesProvider>
        </Router>
      </Provider>
    </>
  );
};

ReactDOM.render(<Providers />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
