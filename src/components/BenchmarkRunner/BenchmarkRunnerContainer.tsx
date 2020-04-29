import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'

import { paths } from '../../routes'
import { AiImplementationInfo } from '../../data/aiImplementationList/aiImplementationDataType'
import { aiImplementationListDataActions } from '../../data/aiImplementationList/aiImplementationListActions'
import {
  BenchmarkingSession,
  BenchmarkingSessionStatus,
} from '../../data/benchmarks/benchmarkManagerDataType'
import {
  benchmarkingSessionDataAction,
  observeRunningBenchmarkDataAction,
} from '../../data/benchmarks/benchmarkActions'
import { RunningBenchmarkReport } from '../../data/benchmarks/benchmarkInfoDataType'
import useDataStateLoader from '../../data/util/dataState/useDataStateLoader'
import { DataReady, DataState } from '../../data/util/dataState/dataStateTypes'
import DataStateManager from '../common/DataStateManager'
import BasicPageLayout from '../common/BasicPageLayout'

import BenchmarkRunnerComponent from './BenchmarkRunnerComponent'

const BenchmarkRunnerContainer: React.FC<{}> = () => {
  const { benchmarkId } = useParams()
  const history = useHistory()

  const aiImplementationList = useDataStateLoader<{
    [id: string]: AiImplementationInfo
  }>(
    state => state.aiImplementationList,
    aiImplementationListDataActions.load({
      withHealth: false,
    }),
  )

  const benchmarkingSession = useDataStateLoader<BenchmarkingSession>(
    state => state.benchmark.entries[benchmarkId],
    benchmarkingSessionDataAction.load(benchmarkId, {
      benchmarkingSessionId: benchmarkId,
    }),
  )

  const runningBenchmarkReport = useDataStateLoader<RunningBenchmarkReport>(
    state => state.benchmark.runningBenchmarkStatus,
    observeRunningBenchmarkDataAction.load(benchmarkId),
  )

  useEffect(() => {
    if (
      benchmarkingSession.state === DataState.READY &&
      benchmarkingSession.data.status === BenchmarkingSessionStatus.FINISHED
    ) {
      history.push(paths.benchmarkEvaluate(benchmarkId))
    }
  }, [benchmarkId, benchmarkingSession])

  return (
    <BasicPageLayout
      title={
        <>
          Running benchmark{' '}
          <DataStateManager<BenchmarkingSession>
            data={benchmarkingSession}
            componentFunction={(data): string => data.id}
          />
        </>
      }
      action={
        <DataStateManager
          data={runningBenchmarkReport}
          componentFunction={({ statistics }): JSX.Element => (
            <CircularProgress
              variant='static'
              value={
                (statistics.currentCaseIndex / statistics.totalCaseCount) * 100
              }
            />
          )}
          loading={
            runningBenchmarkReport.state === DataState.READY &&
            runningBenchmarkReport.data.status ===
              BenchmarkingSessionStatus.INTERMEDIATE
          }
        />
      }
    >
      <DataStateManager
        // todo: enable `DataStateManager` to consume and pass an array of `Loadable`s
        data={benchmarkingSession}
        componentFunction={(benchmarkManagerData): JSX.Element => (
          <BenchmarkRunnerComponent
            benchmarkingSession={benchmarkManagerData}
            report={
              // loading is handled manually, see below
              (runningBenchmarkReport as DataReady<RunningBenchmarkReport>).data
            }
            aiImplementations={aiImplementationList}
          />
        )}
        loading={runningBenchmarkReport.state !== DataState.READY}
      />
    </BasicPageLayout>
  )
}

export default BenchmarkRunnerContainer
