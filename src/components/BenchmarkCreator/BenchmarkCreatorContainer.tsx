import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'qs'

import { CircularProgress, Typography } from '@material-ui/core'

import {
  aiImplementationListDataActions,
  aiImplementationListLoadParameters,
} from '../../data/aiImplementationList/aiImplementationListActions'
import BenchmarkCreatorComponent from './BenchmarkCreatorComponent'
import { AiImplementationListState } from '../../data/aiImplementationList/aiImplementationListReducers'
import { RootState } from '../../data/rootReducer'
import { CaseSetListState } from '../../data/caseSetList/caseSetListReducers'
import { caseSetListDataActions } from '../../data/caseSetList/caseSetListActions'
import {
  benchmarkManagerDataAction,
  CreateBenchmarkManagerParameters,
} from '../../data/benchmarks/benchmarkActions'
import { DataState, Loadable } from '../../data/util/dataState/dataStateTypes'
import { BenchmarkManager } from '../../data/benchmarks/benchmarkManagerDataType'
import { paths } from '../../routes'
import Error from '../Common/Error'

type AiImplementationManagerContainerDataProps = {
  aiImplementationList: AiImplementationListState
  benchmarkManager: Loadable<BenchmarkManager>
  caseSetList: CaseSetListState
}
type AiImplementationManagerContainerFunctionProps = {
  fetchAiImplementationList: (
    parameters: aiImplementationListLoadParameters,
  ) => void
  fetchCaseSetList: () => void
  createBenchmarkManager: (
    benchmarkParameters: CreateBenchmarkManagerParameters,
  ) => void
}
type AiImplementationManagerContainerProps = AiImplementationManagerContainerDataProps &
  AiImplementationManagerContainerFunctionProps

const BenchmarkCreatorContainer: React.FC<AiImplementationManagerContainerProps> = ({
  aiImplementationList,
  benchmarkManager,
  caseSetList,
  fetchAiImplementationList,
  fetchCaseSetList,
  createBenchmarkManager,
}) => {
  const history = useHistory()

  useEffect(() => {
    fetchAiImplementationList({ withHealth: false })
    fetchCaseSetList()
  }, [fetchAiImplementationList, fetchCaseSetList])

  useEffect(() => {
    if (benchmarkManager.state === DataState.READY) {
      history.push(paths.benchmarkRun(benchmarkManager.data.benchmarkManagerId))
    }
  }, [benchmarkManager, history])

  const searchParams = queryString.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  })

  if (benchmarkManager.state === DataState.LOADING) {
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
          createBenchmarkManager(benchmarkParameters)
        }}
      />
    )
  }

  return (
    <>
      <Typography variant='h2' gutterBottom>
        Select settings for a new benchmark
      </Typography>
      {content}
    </>
  )
}

const mapStateToProps: (
  state: RootState,
) => AiImplementationManagerContainerDataProps = state => ({
  aiImplementationList: state.aiImplementationList,
  benchmarkManager: state.benchmark.benchmarkManager,
  caseSetList: state.caseSetList,
})
const mapDispatchToProps: AiImplementationManagerContainerFunctionProps = {
  fetchAiImplementationList: aiImplementationListDataActions.load,
  fetchCaseSetList: caseSetListDataActions.load,
  createBenchmarkManager: benchmarkManagerDataAction.load,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BenchmarkCreatorContainer)
