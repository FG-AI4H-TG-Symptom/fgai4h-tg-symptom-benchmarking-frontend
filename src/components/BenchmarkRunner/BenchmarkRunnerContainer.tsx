import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Paper } from '@material-ui/core'
import { RootState } from '../../data/rootReducer'
import { BenchmarkManager } from '../../data/benchmarks/benchmarkManagerDataType'
import { DataState, Loadable } from '../util/UtilTypes'
import {
  requestBenchmarkManager as requestBenchmarkManagerAction,
  runBenchmarkOnCaseSet as runBenchmarkOnCaseSetAction,
} from '../../data/benchmarks/benchmarkActions'
import DataStateManager from '../util/DataStateManager'
import BenchmarkRunnerComponent from './BenchmarkRunnerComponent'
import { BenchmarkInfo } from '../../data/benchmarks/benchmarkInfoDataType'

type BenchmarkRunnerContainerDataProps = {
  benchmarkManager: Loadable<BenchmarkManager>
  currentBenchmarkingSession: BenchmarkInfo
}
type BenchmarkRunnerContainerFunctionProps = {
  requestBenchmarkManager: () => void
  runBenchmarkOnCaseSet: (benchmarkRequest: {
    caseSetId: string
    benchmarkManagerId: string
    aiImplementationNames: string[]
  }) => void
}
type BenchmarkRunnerContainerProps = BenchmarkRunnerContainerDataProps &
  BenchmarkRunnerContainerFunctionProps

const BenchmarkRunnerContainer: React.FC<BenchmarkRunnerContainerProps> = ({
  requestBenchmarkManager,
  runBenchmarkOnCaseSet,
  benchmarkManager,
  currentBenchmarkingSession,
}) => {
  const { caseSetId } = useParams()
  useEffect(() => {
    requestBenchmarkManager()
  }, [requestBenchmarkManager])
  useEffect(() => {
    if (benchmarkManager.state === DataState.READY) {
      runBenchmarkOnCaseSet({
        benchmarkManagerId: benchmarkManager.data.benchmarkManagerId,
        caseSetId,
        aiImplementationNames: [
          'toy_ai_random_uniform',
          'babylon_toy_ai',
          'toy_ai_faulty_random_uniform',
        ],
      })
    }
  }, [runBenchmarkOnCaseSet, benchmarkManager, caseSetId])

  return (
    <>
      <h2>
        Running benchmark{' '}
        <DataStateManager<BenchmarkManager>
          data={benchmarkManager}
          componentFunction={(data): string => data.benchmarkManagerId}
        />
      </h2>
      <Paper>
        <DataStateManager
          data={benchmarkManager}
          componentFunction={(): JSX.Element => (
            <BenchmarkRunnerComponent benchmark={currentBenchmarkingSession} />
          )}
          loading={!currentBenchmarkingSession}
        />
      </Paper>
    </>
  )
}

const mapStateToProps: (
  state: RootState,
) => BenchmarkRunnerContainerDataProps = state => ({
  benchmarkManager: state.benchmark.benchmarkManager,
  currentBenchmarkingSession: state.benchmark.currentBenchmarkingSession,
})
const mapDispatchToProps: BenchmarkRunnerContainerFunctionProps = {
  requestBenchmarkManager: requestBenchmarkManagerAction,
  runBenchmarkOnCaseSet: runBenchmarkOnCaseSetAction,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BenchmarkRunnerContainer)
