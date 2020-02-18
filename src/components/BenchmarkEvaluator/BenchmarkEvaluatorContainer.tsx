import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { Typography } from '@material-ui/core'
import { RootState } from '../../data/rootReducer'
import { Loadable } from '../../data/util/dataState/dataStateTypes'
import { lastBenchmarkEvaluationDataAction } from '../../data/benchmarks/benchmarkActions'
import DataStateManager from '../Common/DataStateManager'
import BenchmarkEvaluatorComponent from './BenchmarkEvaluatorComponent'
import { BenchmarkInfo } from '../../data/benchmarks/benchmarkInfoDataType'
import Warning from '../Common/Warning'
import { paths } from '../../routes'
import { BenchmarkEvaluation } from '../../data/benchmarks/benchmarkEvaluationDataType'

type BenchmarkRunnerContainerDataProps = {
  currentBenchmarkingSession: BenchmarkInfo
  lastBenchmarkEvaluation: Loadable<BenchmarkEvaluation>
}
type BenchmarkRunnerContainerFunctionProps = {
  fetchLastBenchmarkEvaluation: () => void
}
type BenchmarkRunnerContainerProps = BenchmarkRunnerContainerDataProps &
  BenchmarkRunnerContainerFunctionProps

const BenchmarkEvaluatorContainer: React.FC<BenchmarkRunnerContainerProps> = ({
  currentBenchmarkingSession,
  lastBenchmarkEvaluation,
  fetchLastBenchmarkEvaluation,
}) => {
  useEffect(() => {
    fetchLastBenchmarkEvaluation()
  }, [fetchLastBenchmarkEvaluation])

  if (!currentBenchmarkingSession) {
    return (
      <Warning
        title='No benchmark available'
        actions={[
          { text: 'Create benchmark', targetUrl: paths.benchmarkCreate() },
        ]}
      >
        The benchmark evaluator can currently only evaluate a benchmark that was
        just executed. Do you want to create a new benchmark?
      </Warning>
    )
  }

  return (
    <>
      <Typography variant='h2' gutterBottom>
        Benchmark evaluation
      </Typography>
      <DataStateManager
        data={lastBenchmarkEvaluation}
        componentFunction={(evaluation): JSX.Element => (
          <BenchmarkEvaluatorComponent evaluation={evaluation} />
        )}
        loading={!currentBenchmarkingSession}
      />
    </>
  )
}

const mapStateToProps: (
  state: RootState,
) => BenchmarkRunnerContainerDataProps = state => ({
  currentBenchmarkingSession: state.benchmark.currentBenchmarkingSession,
  lastBenchmarkEvaluation: state.benchmark.lastEvaluation,
})
const mapDispatchToProps: BenchmarkRunnerContainerFunctionProps = {
  fetchLastBenchmarkEvaluation: lastBenchmarkEvaluationDataAction.load,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BenchmarkEvaluatorContainer)
