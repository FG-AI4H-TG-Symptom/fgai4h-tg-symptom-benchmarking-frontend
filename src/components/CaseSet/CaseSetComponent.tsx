import React from 'react'
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@material-ui/core'
import {
  ExpandMore as ExpandMoreIcon,
  Check as CheckIcon,
  Clear as ClearIcon,
} from '@material-ui/icons'

import {
  CaseDataType,
  Presence,
  PresenceStates,
} from '../../data/caseSets/caseDataType'

import * as Styled from './CaseSetComponent.style'
import TextWithTooltipSelf from '../util/TextWithTooltipSelf'

const PresenceIcon: React.FC<{ presence: Presence }> = ({ presence }) => (
  <Tooltip title={presence}>
    {presence === PresenceStates.PRESENT ? <CheckIcon /> : <ClearIcon />}
  </Tooltip>
)

const CaseSetComponent: React.FC<{ caseSet: CaseDataType[] }> = ({
  caseSet,
}) => (
  <>
    <TableContainer component={Paper}>
      <Table>
        <caption>{caseSet.length} cases</caption>
        <TableHead>
          <TableRow>
            <Styled.CaseIdCell>Case ID</Styled.CaseIdCell>
            <TableCell>Case creator</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Spreadsheet case ID</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Biological sex</TableCell>
            <TableCell>Presenting complaints</TableCell>
            <TableCell>Other features</TableCell>
            <TableCell>Condition</TableCell>
            <TableCell>Expected triage level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {caseSet.map(({ caseData, valuesToPredict }) => (
            <TableRow key={caseData.caseId}>
              <Styled.CaseIdCell>
                <TextWithTooltipSelf>{caseData.caseId}</TextWithTooltipSelf>
              </Styled.CaseIdCell>
              <TableCell>{caseData.metaData.case_creator}</TableCell>
              <Styled.CaseDescriptionCell>
                <TextWithTooltipSelf>
                  {caseData.metaData.description}
                </TextWithTooltipSelf>
              </Styled.CaseDescriptionCell>
              <TableCell>{caseData.metaData.spreadsheet_case_id}</TableCell>
              <TableCell>{caseData.profileInformation.age}</TableCell>
              <TableCell>{caseData.profileInformation.biologicalSex}</TableCell>
              <TableCell>
                {caseData.presentingComplaints.map(({ id, name, state }) => (
                  <Styled.IconWrapper key={`${caseData.caseId}_${id}`}>
                    <PresenceIcon presence={state} />
                    {name}
                  </Styled.IconWrapper>
                ))}
              </TableCell>
              <TableCell>
                {caseData.otherFeatures.map(({ id, name, state }) => (
                  <Styled.IconWrapper key={`${caseData.caseId}_${id}`}>
                    <PresenceIcon presence={state} />
                    {name}
                  </Styled.IconWrapper>
                ))}
              </TableCell>
              <TableCell>{valuesToPredict.condition.name}</TableCell>
              <TableCell>{valuesToPredict.expectedTriageLevel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='cases-source-content'
        id='cases-source-header'
      >
        View Raw
      </ExpansionPanelSummary>
      <ExpansionPanelDetails id='cases-source-content'>
        <Styled.RawView>{JSON.stringify(caseSet, null, 2)}</Styled.RawView>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </>
)

export default CaseSetComponent
