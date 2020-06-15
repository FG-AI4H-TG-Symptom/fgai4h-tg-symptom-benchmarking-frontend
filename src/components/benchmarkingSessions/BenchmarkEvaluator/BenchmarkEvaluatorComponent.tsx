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
            {evaluation.aiImplementations.length} AI implementations,{' '}
            {evaluation.responses.length} cases, {evaluation.metrics.length}{' '}
            metrics
          </caption>
          <TableHead>
            <TableRow>
              <TableCell>AI implementation name</TableCell>
              {evaluation.metrics.map(({ id, name }) => (
                <CommonStyled.CenteredTableCell key={id}>
                  {name}
                </CommonStyled.CenteredTableCell>
              ))}
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
                {evaluation.metrics.map(({ id, aggregatedValues }) => (
                  <CommonStyled.CenteredTableCell key={id}>
                    {aggregatedValues[aiImplementationId]}
                  </CommonStyled.CenteredTableCell>
                ))}
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
