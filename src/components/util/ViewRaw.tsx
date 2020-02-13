import React from 'react'
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import * as Styled from './ViewRaw.style'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ViewRaw: React.FC<{ data: any; ariaPrefix: string }> = ({
  data,
  ariaPrefix,
}) => (
  <ExpansionPanel>
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`${ariaPrefix}-content`}
      id={`${ariaPrefix}-header`}
    >
      View Raw
    </ExpansionPanelSummary>
    <ExpansionPanelDetails id={`${ariaPrefix}-content`}>
      <Styled.RawView>{JSON.stringify(data, null, 2)}</Styled.RawView>
    </ExpansionPanelDetails>
  </ExpansionPanel>
)

export default ViewRaw
