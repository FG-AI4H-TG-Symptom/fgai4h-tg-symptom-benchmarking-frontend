import React from 'react'
import {
  Box,
  CircularProgress,
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
  Check as CompletedIcon,
  ErrorOutline as ErrorIcon,
  FeedbackOutlined as BadResponseIcon,
  HourglassEmpty as TimeoutIcon,
} from '@material-ui/icons'

import { AiImplementationInfo } from '../../../data/aiImplementationList/aiImplementationDataType'
import {
  BenchmarkResultStatus,
  BenchmarkStepError,
  RunningBenchmarkReport,
  RunningBenchmarkStepResponse,
} from '../../../data/benchmarks/benchmarkInfoDataType'
import { BenchmarkingSession } from '../../../data/benchmarks/benchmarkManagerDataType'
import { Loadable } from '../../../data/util/dataState/dataStateTypes'
import DataStateManager from '../../common/DataStateManager'

import * as Styled from './BenchmarkRunnerComponent.style'

const BenchmarkCaseStatusIcon: React.FC<{
  response: RunningBenchmarkStepResponse
}> = ({ response }) => {
  if (response.status === BenchmarkResultStatus.PENDING) {
    return null
  }

  if (response.status === BenchmarkResultStatus.ERRORED) {
    if (response.error === BenchmarkStepError.TIMEOUT) {
      return (
        <Tooltip title='Timed out'>
          <TimeoutIcon />
        </Tooltip>
      )
    }
    if (response.error === BenchmarkStepError.BAD_RESPONSE) {
      return (
        <Tooltip title='Bad response'>
          <BadResponseIcon />
        </Tooltip>
      )
    }
    return (
      <Tooltip title='Server errored'>
        <ErrorIcon />
      </Tooltip>
    )
  }

  if (response.status === BenchmarkResultStatus.COMPLETED) {
    return (
      <Tooltip title='Completed'>
        <CompletedIcon />
      </Tooltip>
    )
  }

  return <CircularProgress size='1.5em' />
}

interface AiImplementationManagerComponentProps {
  benchmarkingSession: BenchmarkingSession
  report: RunningBenchmarkReport
  aiImplementations: Loadable<{
    [id: string]: AiImplementationInfo
  }>
}

const BenchmarkRunnerComponent: React.FC<AiImplementationManagerComponentProps> = ({
  benchmarkingSession,
  report,
  aiImplementations,
}) => (
  <TableContainer component={Paper}>
    <Table>
      <caption>
        {benchmarkingSession.aiImplementations.length} AI implementations,{' '}
        {report.responses.length} cases
      </caption>
      <TableHead>
        <Styled.GroupingTableRow>
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell colSpan={report.responses.length}>Cases</TableCell>
        </Styled.GroupingTableRow>
        <TableRow>
          <TableCell>AI implementation name</TableCell>
          <TableCell>Errors</TableCell>
          <TableCell>Timeouts</TableCell>
          {report.responses.map(caseReport => (
            <Styled.CaseTableCell
              // there is no guarantee that cases within a case set are unique
              key={`${caseReport.caseId}-${caseReport.caseIndex}`}
            >
              <Box
                fontWeight={
                  // !report.finished &&
                  caseReport.caseIndex === report.statistics.currentCaseIndex
                    ? 'fontWeightBold'
                    : 'inherit'
                }
              >
                #{caseReport.caseIndex + 1}
              </Box>
            </Styled.CaseTableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {benchmarkingSession.aiImplementations.map(aiImplementationId => (
          <TableRow key={aiImplementationId}>
            <TableCell>
              <DataStateManager
                data={aiImplementations}
                componentFunction={(aiImplementationData): string =>
                  aiImplementationData[aiImplementationId].name
                }
              />
            </TableCell>
            <TableCell>
              {
                report.responses.filter(caseReport => {
                  const response = caseReport.responses[aiImplementationId]

                  return (
                    response.status === BenchmarkResultStatus.ERRORED &&
                    response.error !== BenchmarkStepError.TIMEOUT
                  )
                }).length
              }
            </TableCell>
            <TableCell>
              {
                report.responses.filter(caseReport => {
                  const response = caseReport.responses[aiImplementationId]

                  return (
                    response.status === BenchmarkResultStatus.ERRORED &&
                    response.error === BenchmarkStepError.TIMEOUT
                  )
                }).length
              }
            </TableCell>
            {report.responses.map(caseReport => (
              <TableCell
                // there is no guarantee that cases within a case set are unique
                key={`${caseReport.caseId}-${caseReport.caseIndex}`}
              >
                <BenchmarkCaseStatusIcon
                  response={caseReport.responses[aiImplementationId]}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)

export default BenchmarkRunnerComponent
