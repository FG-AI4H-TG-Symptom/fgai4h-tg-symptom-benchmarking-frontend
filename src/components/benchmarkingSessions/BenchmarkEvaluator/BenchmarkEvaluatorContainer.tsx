import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Tooltip } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

import { aiImplementationListDataActions } from '../../../data/aiImplementationList/aiImplementationListActions'
import { AiImplementationInfo } from '../../../data/aiImplementationList/aiImplementationDataType'
import {
  benchmarkEvaluationDataAction,
  benchmarkingSessionDataAction,
  benchmarkingSessionDeleteDataAction,
} from '../../../data/benchmarks/benchmarkActions'
import { BenchmarkEvaluation } from '../../../data/benchmarks/benchmarkEvaluationDataType'
import { BenchmarkingSession } from '../../../data/benchmarks/benchmarkManagerDataType'
import useDataStateLoader from '../../../data/util/dataState/useDataStateLoader'
import { DataReady } from '../../../data/util/dataState/dataStateTypes'
import DataStateManager from '../../common/DataStateManager'
import BasicPageLayout from '../../common/BasicPageLayout'
import ConfirmationIconButton from '../../common/ConfirmationIconButton'
import { paths } from '../../../routes'

import BenchmarkEvaluatorComponent from './BenchmarkEvaluatorComponent'

const BenchmarkEvaluatorContainer: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { benchmarkId: benchmarkingSessionId } = useParams()

  const benchmarkingSession = useDataStateLoader<BenchmarkingSession>(
    'benchmark',
    benchmarkingSessionDataAction.load(benchmarkingSessionId, {
      benchmarkingSessionId,
    }),
    {
      getSingleEntryForId: benchmarkingSessionId,
    },
  )

  const benchmarkingSessionResults = useDataStateLoader<BenchmarkEvaluation>(
    state =>
      (state.benchmark.entries[benchmarkingSessionId] as DataReady<
        BenchmarkingSession
      >).data.results,
    benchmarkEvaluationDataAction.load(benchmarkingSessionId, {
      benchmarkingSessionId,
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

  const deleteBenchmarkingSession = (): void => {
    dispatch(
      benchmarkingSessionDeleteDataAction.load(benchmarkingSessionId, {
        benchmarkingSessionId,
        onSuccess: () => history.push(paths.benchmarkingSessions()),
      }),
    )
  }

  return (
    <BasicPageLayout
      title='Benchmark evaluation'
      action={
        <Tooltip title='Hold to delete benchmarking session'>
          <span>
            <ConfirmationIconButton
              onConfirmed={deleteBenchmarkingSession}
              color='darkred'
              aria-label='delete benchmarking session'
            >
              <DeleteIcon />
            </ConfirmationIconButton>
          </span>
        </Tooltip>
      }
    >
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
