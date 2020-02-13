import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Box, Button, CircularProgress, Paper } from '@material-ui/core'
import { ArrowForward as ContinueIcon } from '@material-ui/icons'
import { RootState } from '../../data/rootReducer'
import { BenchmarkManager } from '../../data/benchmarks/benchmarkManagerDataType'
import { DataState, Loadable } from '../util/UtilTypes'
import {
  clearBenchmarkManager as clearBenchmarkManagerAction,
  observeRunningBenchmark as observeRunningBenchmarkAction,
} from '../../data/benchmarks/benchmarkActions'
import DataStateManager from '../util/DataStateManager'
import BenchmarkRunnerComponent from './BenchmarkRunnerComponent'
import { BenchmarkInfo } from '../../data/benchmarks/benchmarkInfoDataType'

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
  }, [observeRunningBenchmark, benchmarkId])

  const handleViewReport = (): void => {
    clearBenchmarkManager()
    // todo: navigate to report page
  }

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <h2>
          Running benchmark{' '}
          <DataStateManager<BenchmarkManager>
            data={benchmarkManager}
            componentFunction={(data): string => data.benchmarkManagerId}
          />
        </h2>
        {currentBenchmarkingSession && currentBenchmarkingSession.finished ? (
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
        )}
      </Box>
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
  clearBenchmarkManager: clearBenchmarkManagerAction,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BenchmarkRunnerContainer)
