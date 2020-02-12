import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'

const themeCustomizations = createMuiTheme({
  palette: {
    primary: {
      main: '#1e88e5',
    },
    secondary: {
      main: '#008f68',
    },
  },
})

themeCustomizations.typography.h1.fontSize = '2rem'
themeCustomizations.typography.h3.fontSize = '1.5rem'

const theme = responsiveFontSizes(themeCustomizations)

export default theme
