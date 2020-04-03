import styled from 'styled-components'
import {
  Box,
  ExpansionPanelDetails,
  IconButton,
  Typography,
} from '@material-ui/core'

export const ExpansionPanelTitleContainer = styled(Box)`
  flex-basis: 15em;
  flex-shrink: 0;
`

export const ExpansionPanelSubtitle = styled(Typography)`
  font-size: 80%;
`

export const ExpansionPanelDeleteButton = styled(IconButton)`
  margin-left: auto;
`

export const ExpansionPanelDetailsVertical = styled(ExpansionPanelDetails)`
  flex-direction: column;
`
