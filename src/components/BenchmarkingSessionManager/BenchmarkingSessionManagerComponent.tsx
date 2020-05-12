import React, { useState } from 'react'
import {
  IconButton,
  Paper,
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
  Delete as DeleteIcon,
  PlayCircleOutline as StartBenchmarkIcon,
  ViewList as OpenIcon,
} from '@material-ui/icons'

import {
  BenchmarkingSession,
  BenchmarkingSessionStatus,
} from '../../data/benchmarks/benchmarkManagerDataType'
import LinkWrapper from '../common/LinkWrapper'
import { paths } from '../../routes'

import * as Styled from './BenchmarkingSessionManagerComponent.style'
import * as CommonStyled from '../common/CommonStyles'
import BenchmarkingSessionStatusIcon from './BenchmarkingSessionStatusIcon'
import ConfirmationIconButton from '../common/ConfirmationIconButton'

const rowsPerPageOptions = [10, 20, 50, 100]

interface CaseSetManagerComponentProps {
  benchmarkingSessions: BenchmarkingSession[]
  deleteBenchmarkingSession: (benchmarkingSessionId: string) => void
}

const BenchmarkingSessionManagerComponent: React.FC<CaseSetManagerComponentProps> = ({
  benchmarkingSessions,
  deleteBenchmarkingSession,
}) => {
  const activeRowsPerPageOptions = rowsPerPageOptions.filter(
    rowsPerPageOption => rowsPerPageOption <= benchmarkingSessions.length,
  )
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0])

  return (
    <Paper>
      {benchmarkingSessions.length > rowsPerPageOptions[0] ? (
        <TablePagination
          component='div'
          count={benchmarkingSessions.length}
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
          <caption>{benchmarkingSessions.length} benchmarking sessions</caption>
          <TableHead>
            <TableRow>
              <TableCell>Benchmarking session ID</TableCell>
              <TableCell>Status</TableCell>
              <Styled.ActionHeaderTableCell>
                Actions
              </Styled.ActionHeaderTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {benchmarkingSessions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(({ id, aiImplementations, status }) => (
                <TableRow key={id}>
                  <TableCell>
                    {id}
                    <CommonStyled.SecondaryTextInCell>
                      {aiImplementations.length} AI implementations
                    </CommonStyled.SecondaryTextInCell>
                  </TableCell>
                  <CommonStyled.CenteredTableCell>
                    <BenchmarkingSessionStatusIcon status={status} />
                  </CommonStyled.CenteredTableCell>
                  <CommonStyled.CenteredTableCell>
                    <Tooltip title='Start benchmarking session'>
                      <span>
                        {/* todo: integrate this behavior */}
                        <IconButton
                          aria-label='start benchmark'
                          disabled={
                            status !== BenchmarkingSessionStatus.CREATED
                          }
                        >
                          <StartBenchmarkIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title='View results'>
                      <span>
                        <LinkWrapper
                          to={paths.benchmarkEvaluate(id)}
                          disabled={
                            status !== BenchmarkingSessionStatus.FINISHED
                          }
                        >
                          <IconButton
                            aria-label='view'
                            disabled={
                              status !== BenchmarkingSessionStatus.FINISHED
                            }
                          >
                            <OpenIcon />
                          </IconButton>
                        </LinkWrapper>
                      </span>
                    </Tooltip>
                    <Tooltip title='Hold to delete benchmarking session'>
                      <span>
                        <ConfirmationIconButton
                          onConfirmed={(): void =>
                            deleteBenchmarkingSession(id)
                          }
                          color='darkred'
                          aria-label='delete benchmarking session'
                        >
                          <DeleteIcon />
                        </ConfirmationIconButton>
                      </span>
                    </Tooltip>
                  </CommonStyled.CenteredTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default BenchmarkingSessionManagerComponent
