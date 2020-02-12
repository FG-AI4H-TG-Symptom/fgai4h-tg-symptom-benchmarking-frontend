import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Paper } from '@material-ui/core'
import { RootState } from '../../data/rootReducer'
import { BenchmarkManager } from '../../data/benchmarks/benchmarkManagerDataType'
import { DataState, Loadable } from '../util/UtilTypes'
import { observeRunningBenchmark as observeRunningBenchmarkAction } from '../../data/benchmarks/benchmarkActions'
import DataStateManager from '../util/DataStateManager'
import BenchmarkRunnerComponent from './BenchmarkRunnerComponent'
import { BenchmarkInfo } from '../../data/benchmarks/benchmarkInfoDataType'

type BenchmarkRunnerContainerDataProps = {
  benchmarkManager: Loadable<BenchmarkManager>
  currentBenchmarkingSession: BenchmarkInfo
}
type BenchmarkRunnerContainerFunctionProps = {
  observeRunningBenchmark: (benchmarkManagerId: string) => void
}
type BenchmarkRunnerContainerProps = BenchmarkRunnerContainerDataProps &
  BenchmarkRunnerContainerFunctionProps

const BenchmarkRunnerContainer: React.FC<BenchmarkRunnerContainerProps> = ({
  observeRunningBenchmark,
  benchmarkManager,
  currentBenchmarkingSession,
}) => {
  const { benchmarkId } = useParams()
  useEffect(() => {
    if (benchmarkManager.state === DataState.READY) {
      observeRunningBenchmark(benchmarkId)
    }
  }, [observeRunningBenchmark, benchmarkId])

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
  observeRunningBenchmark: observeRunningBenchmarkAction,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BenchmarkRunnerContainer)
