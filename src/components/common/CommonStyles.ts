import styled from 'styled-components'
import { CardActions, TableCell } from '@material-ui/core'

export const SecondaryTextInCell = styled.div`
  color: ${({ theme }): string => theme.palette.text.secondary};
`

export const CenteredTableCell = styled(TableCell)`
  text-align: center;
`

export const CardActionsEnd = styled(CardActions)`
  justify-content: flex-end;
`
