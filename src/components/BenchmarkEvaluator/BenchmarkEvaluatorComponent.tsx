import React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'

import { BenchmarkEvaluation } from '../../data/benchmarks/benchmarkEvaluationDataType'
import ViewRaw from '../Common/ViewRaw'
import { mean } from '../../util/math'

import * as CommonStyled from '../Common/CommonStyles'

interface AiImplementationManagerComponentProps {
  evaluation: BenchmarkEvaluation
}

const BenchmarkEvaluatorComponent: React.FC<AiImplementationManagerComponentProps> = ({
  evaluation,
}) => {
  const metricNames = Object.keys(Object.values(evaluation)[0][0])
  const aggregateMetrics = Object.entries(evaluation).map(
    ([aiImplementationName, metricsPerCase]) => {
      const result = {
        aiImplementationName,
      }

      metricNames.forEach(metricName => {
        result[metricName] = mean(
          metricsPerCase.map(metrics => metrics[metricName]),
        )
      })

      return result
    },
  )
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <caption>
            {Object.keys(evaluation).length} AI implementations,{' '}
            {Object.entries(evaluation)[0].length} cases, {metricNames.length}{' '}
            metrics
          </caption>
          <TableHead>
            <TableRow>
              <TableCell>AI implementation name</TableCell>
              {metricNames.map(metricName => (
                <CommonStyled.CenteredTableCell key={metricName}>
                  {metricName}
                </CommonStyled.CenteredTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {aggregateMetrics.map(({ aiImplementationName, ...metrics }) => (
              <TableRow key={aiImplementationName}>
                <TableCell>{aiImplementationName}</TableCell>
                {metricNames.map(metricName => (
                  <CommonStyled.CenteredTableCell key={metricName}>
                    {metrics[metricName]}
                  </CommonStyled.CenteredTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ViewRaw data={evaluation} ariaPrefix='evaluation-source' />
    </>
  )
}

export default BenchmarkEvaluatorComponent