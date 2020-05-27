import React, { useState } from 'react'
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@material-ui/core'
import {
  Check as CheckIcon,
  Clear as ClearIcon,
  Edit as EditIcon,
} from '@material-ui/icons'

import TextWithTooltipSelf from '../../common/TextWithTooltipSelf'

import * as Styled from './CaseSetViewerTable.style'
import LinkWrapper from '../../common/LinkWrapper'
import { paths } from '../../../routes'
import { CaseSetInfo } from '../../../data/caseSets/caseSetDataType'
import { ClinicalFindingState } from '../../../data/caseSets/berlinModelTypes'

const PresenceIcon: React.FC<{ presence: ClinicalFindingState }> = ({
  presence,
}) => (
  <Tooltip title={presence}>
    {presence === 'present' ? <CheckIcon /> : <ClearIcon />}
  </Tooltip>
)

const rowsPerPageOptions = [10, 20, 50, 100]

export interface CaseSetComponentProps {
  caseSet: CaseSetInfo
}

const CaseSetViewerTable: React.FC<CaseSetComponentProps> = ({
  caseSet: { id: caseSetId, cases },
}) => {
  const activeRowsPerPageOptions = rowsPerPageOptions.filter(
    rowsPerPageOption => rowsPerPageOption <= cases.length,
  )
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0])

  return (
    <>
      {cases.length > rowsPerPageOptions[0] ? (
        <TablePagination
          component='div'
          count={cases.length}
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
          <caption>{cases.length} cases</caption>
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cases
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(
                ({
                  id: caseId2,
                  data: { caseId, metaData, caseData, valuesToPredict },
                }) => (
                  <TableRow key={caseId}>
                    <Styled.CaseIdCell>
                      <TextWithTooltipSelf>{caseId}</TextWithTooltipSelf>
                    </Styled.CaseIdCell>
                    <TableCell>{metaData.caseCreator}</TableCell>
                    <Styled.CaseDescriptionCell>
                      <TextWithTooltipSelf>
                        {metaData.description}
                      </TextWithTooltipSelf>
                    </Styled.CaseDescriptionCell>
                    <TableCell>{metaData.spreadsheetCaseId}</TableCell>
                    <TableCell>{caseData.profileInformation.age}</TableCell>
                    <TableCell>
                      {caseData.profileInformation.biologicalSex}
                    </TableCell>
                    <TableCell>
                      {caseData.presentingComplaints.map(
                        ({ id: presentingComplaintId, name, state }) => (
                          <Styled.IconWrapper
                            key={`${caseId}_${presentingComplaintId}`}
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
                            key={`${caseId}_${otherFeatureId}`}
                          >
                            <PresenceIcon presence={state} />
                            {name}
                          </Styled.IconWrapper>
                        ),
                      )}
                    </TableCell>
                    <TableCell>
                      {valuesToPredict.correctCondition.name}
                    </TableCell>
                    <TableCell>{valuesToPredict.expectedTriageLevel}</TableCell>
                    <TableCell>
                      <LinkWrapper
                        to={paths.caseSetCaseEditor(caseSetId, caseId2)}
                      >
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </LinkWrapper>
                    </TableCell>
                  </TableRow>
                ),
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CaseSetViewerTable
