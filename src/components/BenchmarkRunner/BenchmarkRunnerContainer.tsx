import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { Button, CircularProgress } from '@material-ui/core'
import { ArrowForward as ContinueIcon } from '@material-ui/icons'
import { RootState } from '../../data/rootReducer'
import { BenchmarkManager } from '../../data/benchmarks/benchmarkManagerDataType'
import { DataState, Loadable } from '../../data/util/dataState/dataStateTypes'
import {
  benchmarkManagerDataAction,
  observeRunningBenchmark as observeRunningBenchmarkAction,
} from '../../data/benchmarks/benchmarkActions'
import DataStateManager from '../common/DataStateManager'
import BenchmarkRunnerComponent from './BenchmarkRunnerComponent'
import { BenchmarkInfo } from '../../data/benchmarks/benchmarkInfoDataType'
import Warning from '../common/Warning'
import { paths } from '../../routes'
import BasicPageLayout from '../common/BasicPageLayout'

type BenchmarkRunnerContainerDataProps = {
  benchmarkManager: Loadable<BenchmarkManager>
  currentBenchmarkingSession: BenchmarkInfo
}
type BenchmarkRunnerContainerFunctionProps = {
  observeRunningBenchmark: (benchmarkManagerId: string) => void
  clearBenchmarkManager: () => void
}
type BenchmarkRunnerContainerProps = BenchmarkRunnerContainerDataProps &
  BenchmarkRunnerContainerFunctionProps

const BenchmarkRunnerContainer: React.FC<BenchmarkRunnerContainerProps> = ({
  observeRunningBenchmark,
  benchmarkManager,
  currentBenchmarkingSession,
  clearBenchmarkManager,
}) => {
  const { benchmarkId } = useParams()
  useEffect(() => {
    if (benchmarkManager.state === DataState.READY) {
      observeRunningBenchmark(benchmarkId)
    }
  }, [observeRunningBenchmark, benchmarkId, benchmarkManager.state])

  const history = useHistory()
  const handleViewReport = (): void => {
    clearBenchmarkManager()
    history.push(paths.benchmarkEvaluate())
  }

  if (benchmarkManager.state === DataState.INITIAL) {
    return (
      <Warning
        title='No such benchmark'
        actions={[
          { text: 'Create benchmark', targetUrl: paths.benchmarkCreate() },
        ]}
      >
        The benchmark manager currently can&apos;t display benchmarks after they
        have finished or if you have reloaded the browser. Do you want to create
        a new benchmark?
      </Warning>
    )
  }

  const title = (
    <>
      Running benchmark{' '}
      <DataStateManager<BenchmarkManager>
        data={benchmarkManager}
        componentFunction={(data): string => data.benchmarkManagerId}
      />
    </>
  )

  const viewReportButton =
    currentBenchmarkingSession && currentBenchmarkingSession.finished ? (
      <Button
        variant='contained'
        color='primary'
        endIcon={<ContinueIcon />}
        onClick={handleViewReport}
      >
        View report
      </Button>
    ) : (
      <CircularProgress />
    )

  return (
    <BasicPageLayout title={title} action={viewReportButton}>
      <DataStateManager
        data={benchmarkManager}
        componentFunction={(): JSX.Element => (
          <BenchmarkRunnerComponent benchmark={currentBenchmarkingSession} />
        )}
        loading={!currentBenchmarkingSession}
      />
    </BasicPageLayout>
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
  clearBenchmarkManager: benchmarkManagerDataAction.reset,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BenchmarkRunnerContainer)
