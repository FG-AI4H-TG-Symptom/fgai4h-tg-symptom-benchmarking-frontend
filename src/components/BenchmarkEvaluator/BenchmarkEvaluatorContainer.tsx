import React from 'react'
import { useParams } from 'react-router-dom'

import { aiImplementationListDataActions } from '../../data/aiImplementationList/aiImplementationListActions'
import { AiImplementationInfo } from '../../data/aiImplementationList/aiImplementationDataType'
import {
  benchmarkEvaluationDataAction,
  benchmarkingSessionDataAction,
} from '../../data/benchmarks/benchmarkActions'
import { BenchmarkEvaluation } from '../../data/benchmarks/benchmarkEvaluationDataType'
import { BenchmarkingSession } from '../../data/benchmarks/benchmarkManagerDataType'
import useDataStateLoader from '../../data/util/dataState/useDataStateLoader'
import { DataReady } from '../../data/util/dataState/dataStateTypes'
import DataStateManager from '../common/DataStateManager'
import BasicPageLayout from '../common/BasicPageLayout'

import BenchmarkEvaluatorComponent from './BenchmarkEvaluatorComponent'

const BenchmarkEvaluatorContainer: React.FC<{}> = () => {
  const { benchmarkId } = useParams()

  const benchmarkingSession = useDataStateLoader<BenchmarkingSession>(
    state => state.benchmark.entries[benchmarkId],
    benchmarkingSessionDataAction.load(benchmarkId, {
      benchmarkingSessionId: benchmarkId,
    }),
  )

  const benchmarkingSessionResults = useDataStateLoader<BenchmarkEvaluation>(
    state =>
      (state.benchmark.entries[benchmarkId] as DataReady<BenchmarkingSession>)
        .data.results,
    benchmarkEvaluationDataAction.load(benchmarkId, {
      benchmarkingSessionId: benchmarkId,
    }),
    {
      loadAfter: benchmarkingSession,
    },
  )

  const aiImplementationList = useDataStateLoader<{
    [id: string]: AiImplementationInfo
  }>(
    state => state.aiImplementationList,
    aiImplementationListDataActions.load({
      withHealth: false,
    }),
  )

  return (
    <BasicPageLayout title='Benchmark evaluation'>
      <DataStateManager
        data={benchmarkingSessionResults}
        componentFunction={(evaluation): JSX.Element => (
          <BenchmarkEvaluatorComponent
            evaluation={evaluation}
            aiImplementationList={aiImplementationList}
          />
        )}
      />
    </BasicPageLayout>
  )
}

export default BenchmarkEvaluatorContainer
