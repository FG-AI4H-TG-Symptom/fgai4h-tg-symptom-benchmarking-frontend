import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'qs'
import { CircularProgress, Typography } from '@material-ui/core'

import { aiImplementationListDataActions } from '../../../data/aiImplementations/aiImplementationListActions'
import { AiImplementationInfo } from '../../../data/aiImplementations/aiImplementationDataType'
import { createBenchmarkingSessionDataAction } from '../../../data/benchmarks/benchmarkActions'
import { CaseSetInfo } from '../../../data/caseSets/caseSetDataType'
import { caseSetListDataActions } from '../../../data/caseSets/caseSetActions'
import {
  DataState,
  ID_PLACEHOLDER_NEW,
  InitialState,
  LoadableCreateOnly,
} from '../../../data/util/dataState/dataStateTypes'
import useDataStateLoader from '../../util/useDataStateLoader'
import { RootState } from '../../../data/rootReducer'
import { paths } from '../../../routes'
import Error from '../../common/Error'
import BasicPageLayout from '../../common/BasicPageLayout'

import BenchmarkCreatorComponent from './BenchmarkCreatorComponent'

const BenchmarkCreatorContainer: React.FC<{}> = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const aiImplementationList = useDataStateLoader<AiImplementationInfo[]>(
    'aiImplementations',
    aiImplementationListDataActions.load({
      withHealth: false,
    }),
  )
  const caseSetList = useDataStateLoader<CaseSetInfo[]>(
    state => state.caseSets.overview,
    caseSetListDataActions.load(),
  )

  const searchParams = queryString.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  })

  const newBenchmarkingSession = useSelector<RootState, LoadableCreateOnly>(
    state => state.benchmark[ID_PLACEHOLDER_NEW] || InitialState,
  )

  if (newBenchmarkingSession.state === DataState.LOADING) {
    return (
      <>
        <Typography variant='h2' gutterBottom>
          Creating benchmark...
        </Typography>
        <CircularProgress />
      </>
    )
  }

  let content = <CircularProgress />

  if (aiImplementationList.state === DataState.ERRORED) {
    content = <Error error={aiImplementationList.error} />
  } else if (caseSetList.state === DataState.ERRORED) {
    content = <Error error={caseSetList.error} />
  } else if (
    aiImplementationList.state === DataState.READY &&
    caseSetList.state === DataState.READY
  ) {
    content = (
      <BenchmarkCreatorComponent
        aiImplementations={aiImplementationList.data}
        caseSetList={caseSetList.data}
        defaultCaseSetId={searchParams.caseSetId}
        onCreateBenchmark={(benchmarkParameters): void => {
          dispatch(
            createBenchmarkingSessionDataAction.load(benchmarkParameters, {
              onSuccess: createdBenchmarkingSession => {
                history.push(paths.benchmarkRun(createdBenchmarkingSession.id))
              },
            }),
          )
        }}
      />
    )
  }

  return (
    <BasicPageLayout title='Select settings for a new benchmark'>
      {content}
    </BasicPageLayout>
  )
}

export default BenchmarkCreatorContainer
