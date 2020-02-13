import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'qs'

import { CircularProgress, Typography } from '@material-ui/core'

import { fetchAiImplementationList as fetchAiImplementationListAction } from '../../data/aiImplementationList/aiImplementationListActions'
import BenchmarkCreatorComponent from './BenchmarkCreatorComponent'
import { AiImplementationListState } from '../../data/aiImplementationList/aiImplementationListReducers'
import { RootState } from '../../data/rootReducer'
import { CaseSetListState } from '../../data/caseSetList/caseSetListReducers'
import { fetchCaseSetList as fetchCaseSetListAction } from '../../data/caseSetList/caseSetListActions'
import {
  createBenchmarkManager as createBenchmarkManagerAction,
  CreateBenchmarkManagerParameters,
} from '../../data/benchmarks/benchmarkActions'
import { DataState, Loadable } from '../util/UtilTypes'
import { BenchmarkManager } from '../../data/benchmarks/benchmarkManagerDataType'
import { paths } from '../../routes'

type AiImplementationManagerContainerDataProps = {
  aiImplementationList: AiImplementationListState
  benchmarkManager: Loadable<BenchmarkManager>
  caseSetList: CaseSetListState
}
type AiImplementationManagerContainerFunctionProps = {
  fetchAiImplementationList: () => void
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
    fetchAiImplementationList()
    fetchCaseSetList()
  }, [fetchAiImplementationList, fetchCaseSetList])

  useEffect(() => {
    if (benchmarkManager.state === DataState.READY) {
      history.push(paths.benchmarkRun(benchmarkManager.data.benchmarkManagerId))
    }
  }, [benchmarkManager, history]) // eslint-disable-this-line react-hooks/exhaustive-deps

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

  return (
    <>
      <Typography variant='h2' gutterBottom>
        Select settings for a new benchmark
      </Typography>
      {aiImplementationList.state !== DataState.READY ||
      caseSetList.state !== DataState.READY ? (
        <CircularProgress />
      ) : (
        <BenchmarkCreatorComponent
          aiImplementations={aiImplementationList.data}
          caseSetList={caseSetList.data}
          defaultCaseSetId={searchParams.caseSetId}
          onCreateBenchmark={(benchmarkParameters): void => {
            createBenchmarkManager(benchmarkParameters)
          }}
        />
      )}
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
  fetchAiImplementationList: fetchAiImplementationListAction,
  fetchCaseSetList: fetchCaseSetListAction,
  createBenchmarkManager: createBenchmarkManagerAction,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BenchmarkCreatorContainer)
