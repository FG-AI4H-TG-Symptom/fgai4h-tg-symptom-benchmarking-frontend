import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'

import { paths } from '../../../routes'
import { AiImplementationInfo } from '../../../data/aiImplementations/aiImplementationDataType'
import { aiImplementationOverviewDataAction } from '../../../data/aiImplementations/aiImplementationsActions'
import {
  BenchmarkingSession,
  BenchmarkingSessionStatus,
} from '../../../data/benchmarks/benchmarkManagerDataType'
import {
  benchmarkingSessionDataAction,
  observeRunningBenchmarkDataAction,
} from '../../../data/benchmarks/benchmarkActions'
import { RunningBenchmarkReport } from '../../../data/benchmarks/benchmarkInfoDataType'
import {
  DataReady,
  DataState,
} from '../../../data/util/dataState/dataStateTypes'
import useDataStateLoader from '../../util/useDataStateLoader'
import useConceptIdMap from '../../util/useConceptIdMap'
import DataStateManager from '../../common/DataStateManager'
import BasicPageLayout from '../../common/BasicPageLayout'

import BenchmarkRunnerComponent from './BenchmarkRunnerComponent'

const BenchmarkRunnerContainer: React.FC<{}> = () => {
  const { benchmarkId } = useParams()
  const history = useHistory()

  const aiImplementationList = useDataStateLoader<AiImplementationInfo[]>(
    'aiImplementations',
    aiImplementationOverviewDataAction.load({
      withHealth: false,
    }),
  )
  const aiImplementationsMap = useConceptIdMap<AiImplementationInfo>(
    aiImplementationList,
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
  }, [benchmarkId, benchmarkingSession, history])

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
        <DataStateManager<RunningBenchmarkReport>
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
      <DataStateManager<BenchmarkingSession>
        // todo: enable `DataStateManager` to consume and pass an array of `Loadable`s
        data={benchmarkingSession}
        componentFunction={(benchmarkManagerData): JSX.Element => (
          <BenchmarkRunnerComponent
            benchmarkingSession={benchmarkManagerData}
            report={
              // loading is handled manually, see below
              (runningBenchmarkReport as DataReady<RunningBenchmarkReport>).data
            }
            aiImplementations={aiImplementationsMap}
          />
        )}
        loading={runningBenchmarkReport.state !== DataState.READY}
      />
    </BasicPageLayout>
  )
}

export default BenchmarkRunnerContainer
