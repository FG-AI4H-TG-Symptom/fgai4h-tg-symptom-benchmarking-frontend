import styled from 'styled-components'
import { TableCell } from '@material-ui/core'

export const RawView = styled.pre`
  width: 100%;
  max-height: 50vh;
  overflow-y: auto;
`

const TextOverflowCell = styled(TableCell)`
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
`

export const CaseIdCell = styled(TextOverflowCell)`
  max-width: 4rem;
`

export const CaseDescriptionCell = styled(TextOverflowCell)`
  max-width: 8rem;
`

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`
