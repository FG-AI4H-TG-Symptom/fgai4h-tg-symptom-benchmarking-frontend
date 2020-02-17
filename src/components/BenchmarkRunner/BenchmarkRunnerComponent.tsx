import React from 'react'
import {
  Box,
  CircularProgress,
  ExpansionPanel,
  ExpansionPanelSummary,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core'
import {
  ExpandMore as ExpandMoreIcon,
  Check as CompletedIcon,
  ErrorOutline as ErrorIcon,
  HourglassEmpty as TimeoutIcon,
} from '@material-ui/icons'

import { range, sum } from '../../util/math'
import {
  BenchmarkInfo,
  BenchmarkResultStatus,
  BenchmarkResultStatusMap,
  BenchmarkResultStatusNames,
} from '../../data/benchmarks/benchmarkInfoDataType'

import * as Styled from './BenchmarkRunnerComponent.style'

const BenchmarkCaseStatusIcon: React.FC<{
  status: BenchmarkResultStatus
  timeout: boolean
}> = ({ status, timeout }) => {
  if (BenchmarkResultStatusMap[status] === BenchmarkResultStatusNames.FAILED) {
    if (timeout) {
      return (
        <Tooltip title='Timed out'>
          <TimeoutIcon />
        </Tooltip>
      )
    }
    return (
      <Tooltip title='Errored'>
        <ErrorIcon />
      </Tooltip>
    )
  }

  if (
    BenchmarkResultStatusMap[status] === BenchmarkResultStatusNames.COMPLETED
  ) {
    return (
      <Tooltip title='Completed'>
        <CompletedIcon />
      </Tooltip>
    )
  }

  return <CircularProgress size='1.5em' />
}

interface AiImplementationManagerComponentProps {
  benchmark: BenchmarkInfo
}

const BenchmarkRunnerComponent: React.FC<AiImplementationManagerComponentProps> = ({
  benchmark,
}) => (
  <>
    <TableContainer component={Paper}>
      <Table>
        <caption>
          {Object.keys(benchmark.ai_reports).length} AI implementations,{' '}
          {benchmark.total_cases} cases
        </caption>
        <TableHead>
          <Styled.GroupingTableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell colSpan={benchmark.total_cases}>Cases</TableCell>
          </Styled.GroupingTableRow>
          <TableRow>
            <TableCell>AI implementation name</TableCell>
            <TableCell>Errors</TableCell>
            <TableCell>Timeouts</TableCell>
            {range(benchmark.total_cases).map(caseIndex => (
              <Styled.CaseTableCell key={`caseHeader_${caseIndex}`}>
                <Box
                  fontWeight={
                    !benchmark.finished &&
                    caseIndex === benchmark.current_case_index - 1
                      ? 'fontWeightBold'
                      : 'inherit'
                  }
                >
                  #{caseIndex + 1}
                </Box>
              </Styled.CaseTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(benchmark.ai_reports).map(
            ([aiImplementationName, result]) => (
              <TableRow key={aiImplementationName}>
                <TableCell>{aiImplementationName}</TableCell>
                <TableCell>{sum(result.map(({ errors }) => errors))}</TableCell>
                <TableCell>
                  {sum(result.map(({ timeouts }) => timeouts))}
                </TableCell>
                {result.map(({ case_status: caseStatus, timeouts }) => (
                  <TableCell>
                    <BenchmarkCaseStatusIcon
                      status={caseStatus}
                      timeout={Boolean(timeouts)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </TableContainer>

    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='log-content'
        id='log-header'
      >
        Log
      </ExpansionPanelSummary>
      <Styled.ExpansionPanelDetailsAsBlock id='log-content'>
        {benchmark.logs.map(log => (
          <Typography gutterBottom>{log}</Typography>
        ))}
      </Styled.ExpansionPanelDetailsAsBlock>
    </ExpansionPanel>
  </>
)

export default BenchmarkRunnerComponent
