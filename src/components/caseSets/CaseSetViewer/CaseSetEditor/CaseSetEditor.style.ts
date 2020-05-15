import styled from 'styled-components'
import {
  Box,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Fab,
  Typography,
} from '@material-ui/core'

export const VerticallyCenteredExpansionPanelSummary = styled(
  ExpansionPanelSummary,
)`
  > .MuiExpansionPanelSummary-content {
    align-items: center;
  }
`

export const ExpansionPanelTitleContainer = styled(Box)`
  flex-basis: 15em;
  flex-shrink: 0;
`

export const ExpansionPanelSubtitle = styled(Typography)`
  font-size: 80%;
`

export const ExpansionPanelAdditionalButtons = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`

export const ExpansionPanelDetailsVertical = styled(ExpansionPanelDetails)`
  flex-direction: column;
`

export const SaveFab = styled(Fab)`
  position: fixed;
  top: calc(100% - 7rem);
  right: 3rem;
  z-index: 10;
`
