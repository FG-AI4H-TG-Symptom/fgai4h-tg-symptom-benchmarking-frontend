import React, { ReactElement } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'

import { AiImplementationInfo } from '../../../data/aiImplementations/aiImplementationDataType'
import { BenchmarkEvaluation } from '../../../data/benchmarks/benchmarkEvaluationDataType'
import { Loadable } from '../../../data/util/dataState/dataStateTypes'
import { ConceptIdMap } from '../../util/useConceptIdMap'
import ViewRawFooter from '../../common/ViewRawFooter'
import DataStateManager from '../../common/DataStateManager'
import * as CommonStyled from '../../common/CommonStyles'

interface AiImplementationManagerComponentProps {
  evaluation: BenchmarkEvaluation
  aiImplementations: Loadable<ConceptIdMap<AiImplementationInfo>>
}

const BenchmarkEvaluatorComponent: React.FC<AiImplementationManagerComponentProps> = ({
  evaluation,
  aiImplementations,
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <caption>
            {Object.keys(evaluation.aiImplementations).length} AI
            implementations, {evaluation.responses.length} cases,{' '}
            {Object.keys(evaluation.aggregatedMetrics).length} metrics
          </caption>
          <TableHead>
            <TableRow>
              <TableCell>AI implementation name</TableCell>
              {Object.values(evaluation.aggregatedMetrics).map(
                ({ id, name }) => (
                  <CommonStyled.CenteredTableCell key={id}>
                    {name}
                  </CommonStyled.CenteredTableCell>
                ),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {evaluation.aiImplementations.map(aiImplementationId => (
              <TableRow key={aiImplementationId}>
                <TableCell>
                  <DataStateManager<ConceptIdMap<AiImplementationInfo>>
                    data={aiImplementations}
                    componentFunction={(
                      aiImplementationsData,
                    ): ReactElement => (
                      <>{aiImplementationsData[aiImplementationId].name}</>
                    )}
                    interstitial={<>aiImplementationId</>}
                  />
                </TableCell>
                {Object.values(evaluation.aggregatedMetrics).map(
                  ({ id, values }) => (
                    <CommonStyled.CenteredTableCell key={id}>
                      {values[aiImplementationId]}
                    </CommonStyled.CenteredTableCell>
                  ),
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ViewRawFooter data={evaluation} ariaPrefix='evaluation-source' />
    </>
  )
}

export default BenchmarkEvaluatorComponent
