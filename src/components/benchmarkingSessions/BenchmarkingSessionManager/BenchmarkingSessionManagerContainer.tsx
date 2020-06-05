import React from 'react'
import { useDispatch } from 'react-redux'
import { IconButton, Tooltip } from '@material-ui/core'
import { Add as CreateIcon } from '@material-ui/icons'

import BenchmarkingSessionManagerComponent from './BenchmarkingSessionManagerComponent'
import DataStateManager from '../../common/DataStateManager'
import BasicPageLayout from '../../common/BasicPageLayout'
import LinkWrapper from '../../common/LinkWrapper'
import { paths } from '../../../routes'
import useDataStateLoader from '../../util/useDataStateLoader'
import { BenchmarkingSession } from '../../../data/benchmarks/benchmarkManagerDataType'
import {
  benchmarkingSessionDeleteDataAction,
  benchmarkingSessionListDataAction,
} from '../../../data/benchmarks/benchmarkActions'

const BenchmarkingSessionManagerContainer: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const benchmarkingSessions = useDataStateLoader<BenchmarkingSession[]>(
    'benchmark',
    benchmarkingSessionListDataAction.load(),
  )
  const deleteBenchmarkingSession = (benchmarkingSessionId): void => {
    dispatch(
      benchmarkingSessionDeleteDataAction.load(benchmarkingSessionId, {
        benchmarkingSessionId,
      }),
    )
  }

  return (
    <BasicPageLayout
      title='Benchmarking sessions'
      action={
        <LinkWrapper to={paths.benchmarkCreate()}>
          <Tooltip title='Create benchmarking session'>
            <IconButton>
              <CreateIcon />
            </IconButton>
          </Tooltip>
        </LinkWrapper>
      }
    >
      <DataStateManager<BenchmarkingSession[]>
        data={benchmarkingSessions}
        componentFunction={(benchmarkingSessionsData): JSX.Element => (
          <BenchmarkingSessionManagerComponent
            benchmarkingSessions={benchmarkingSessionsData}
            deleteBenchmarkingSession={deleteBenchmarkingSession}
          />
        )}
      />
    </BasicPageLayout>
  )
}

export default BenchmarkingSessionManagerContainer
