import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'

const themeCustomizations = createMuiTheme()

themeCustomizations.typography.h1.fontSize = '2rem'
themeCustomizations.typography.h3.fontSize = '1.5rem'

const theme = responsiveFontSizes(themeCustomizations)

export default theme
