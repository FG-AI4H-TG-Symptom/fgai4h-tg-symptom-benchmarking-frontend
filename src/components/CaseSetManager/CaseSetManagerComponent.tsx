import React from 'react'
import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import {
  Launch as OpenIcon,
  PlayCircleOutline as StartBenchmarkIcon,
} from '@material-ui/icons'

import LinkWrapper from '../util/LinkWrapper'
import { paths } from '../../routes'
import { CaseSetInfo } from '../../data/caseSetList/caseSetDataType'

const LONDON_CASE_SET_ID = 'london_model2019_cases_v1'

interface CaseSetManagerComponentProps {
  caseSetList: CaseSetInfo[]
}

const CaseSetManagerComponent: React.FC<CaseSetManagerComponentProps> = ({
  caseSetList,
}) => (
  <>
    <TableContainer component={Paper}>
      <Table>
        <caption>{caseSetList.length} case sets</caption>
        <TableHead>
          <TableRow>
            <TableCell>Case set ID</TableCell>
            <TableCell>Labels</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {caseSetList.map(({ id }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>
                {id === LONDON_CASE_SET_ID ? (
                  <Chip label='Cases from doctors' color='primary' />
                ) : null}
              </TableCell>
              <TableCell>
                <LinkWrapper to={paths.cases(id)}>
                  <IconButton aria-label='view'>
                    <OpenIcon />
                  </IconButton>
                </LinkWrapper>
                <LinkWrapper to={paths.benchmarkCreate(id)}>
                  <IconButton aria-label='run-benchmark'>
                    <StartBenchmarkIcon />
                  </IconButton>
                </LinkWrapper>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
)

export default CaseSetManagerComponent
