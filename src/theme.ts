/* eslint-disable import/prefer-default-export */
import React from 'react'

import {
  createMuiTheme,
  responsiveFontSizes,
  Theme,
  useMediaQuery,
} from '@material-ui/core'

export const useTheme = (): Theme => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  return React.useMemo(() => {
    const themeCustomizations = createMuiTheme({
      palette: {
        type: prefersDarkMode ? 'dark' : 'light',
        primary: {
          main: prefersDarkMode ? '#1d5bb4' : '#1e88e5',
        },
        secondary: {
          main: '#008f68',
        },
      },
    })

    themeCustomizations.typography.h1.fontSize = '2rem'
    themeCustomizations.typography.h2.fontSize = '1.8rem'
    themeCustomizations.typography.h3.fontSize = '1.5rem'

    return responsiveFontSizes(themeCustomizations)
  }, [prefersDarkMode])
}
