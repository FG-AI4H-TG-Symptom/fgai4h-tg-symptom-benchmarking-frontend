import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@material-ui/core'
import { Check as CheckIcon, Clear as ClearIcon } from '@material-ui/icons'

import {
  CaseDataType,
  Presence,
  PresenceStates,
} from '../../../data/caseSets/caseDataType'
import TextWithTooltipSelf from '../../common/TextWithTooltipSelf'

import * as Styled from './CaseSetViewerTable.style'

const PresenceIcon: React.FC<{ presence: Presence }> = ({ presence }) => (
  <Tooltip title={presence}>
    {presence === PresenceStates.PRESENT ? <CheckIcon /> : <ClearIcon />}
  </Tooltip>
)

const rowsPerPageOptions = [10, 20, 50, 100]

export interface CaseSetComponentProps {
  caseSet: CaseDataType[]
}

const CaseSetViewerTable: React.FC<CaseSetComponentProps> = ({ caseSet }) => {
  const activeRowsPerPageOptions = rowsPerPageOptions.filter(
    rowsPerPageOption => rowsPerPageOption <= caseSet.length,
  )
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0])

  return (
    <>
      {caseSet.length > rowsPerPageOptions[0] ? (
        <TablePagination
          component='div'
          count={caseSet.length}
          page={page}
          onChangePage={(event, newPage): void => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={activeRowsPerPageOptions}
          onChangeRowsPerPage={(event): void => {
            setPage(0)
            setRowsPerPage(parseInt(event.target.value, 10))
          }}
        />
      ) : null}
      <TableContainer>
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
            {caseSet
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(({ id, data: { caseData, valuesToPredict } }) => (
                <TableRow key={id}>
                  <Styled.CaseIdCell>
                    <TextWithTooltipSelf>{id}</TextWithTooltipSelf>
                  </Styled.CaseIdCell>
                  <TableCell>{caseData.metaData.case_creator}</TableCell>
                  <Styled.CaseDescriptionCell>
                    <TextWithTooltipSelf>
                      {caseData.metaData.description}
                    </TextWithTooltipSelf>
                  </Styled.CaseDescriptionCell>
                  <TableCell>{caseData.metaData.spreadsheet_case_id}</TableCell>
                  <TableCell>{caseData.profileInformation.age}</TableCell>
                  <TableCell>
                    {caseData.profileInformation.biologicalSex}
                  </TableCell>
                  <TableCell>
                    {caseData.presentingComplaints.map(
                      ({ id: presentingComplaintId, name, state }) => (
                        <Styled.IconWrapper
                          key={`${caseData.caseId}_${presentingComplaintId}`}
                        >
                          <PresenceIcon presence={state} />
                          {name}
                        </Styled.IconWrapper>
                      ),
                    )}
                  </TableCell>
                  <TableCell>
                    {caseData.otherFeatures.map(
                      ({ id: otherFeatureId, name, state }) => (
                        <Styled.IconWrapper
                          key={`${caseData.caseId}_${otherFeatureId}`}
                        >
                          <PresenceIcon presence={state} />
                          {name}
                        </Styled.IconWrapper>
                      ),
                    )}
                  </TableCell>
                  <TableCell>{valuesToPredict.condition.name}</TableCell>
                  <TableCell>{valuesToPredict.expectedTriageLevel}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CaseSetViewerTable
