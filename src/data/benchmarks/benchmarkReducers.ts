import { BenchmarkManager } from './benchmarkManagerDataType'
import {
  DataState,
  InitialState,
  Loadable,
  LoadingState,
} from '../util/dataState/dataStateTypes'
import { BenchmarkActionTypes } from './benchmarkActions'
import { BenchmarkInfo } from './benchmarkInfoDataType'
import { BenchmarkEvaluation } from './benchmarkEvaluationDataType'

export interface BenchmarkState {
  benchmarkManager: Loadable<BenchmarkManager>
  currentBenchmarkingSession?: BenchmarkInfo
  lastEvaluation: Loadable<BenchmarkEvaluation>
}

const benchmarkInitialState: BenchmarkState = {
  benchmarkManager: InitialState,
  lastEvaluation: InitialState,
}

const actionHandlers: {
  [key in BenchmarkActionTypes]: (
    state: BenchmarkState,
    action,
  ) => BenchmarkState
} = {
  [BenchmarkActionTypes.CREATE_BENCHMARK_MANAGER]: state => ({
    ...state,
    benchmarkManager: { state: DataState.LOADING },
  }),
  [BenchmarkActionTypes.SET_BENCHMARK_MANAGER]: (state, action) => ({
    ...state,
    benchmarkManager: { state: DataState.READY, data: action.payload },
  }),
  [BenchmarkActionTypes.CLEAR_BENCHMARK_MANAGER]: state => ({
    ...state,
    benchmarkManager: InitialState,
  }),
  [BenchmarkActionTypes.OBSERVE_RUNNING_BENCHMARK]: state => state,
  [BenchmarkActionTypes.SET_RUNNING_BENCHMARK_INFO]: (state, action) => ({
    ...state,
    currentBenchmarkingSession: action.payload,
  }),
  [BenchmarkActionTypes.FETCH_LAST_BENCHMARK_EVALUATION]: state => ({
    ...state,
    lastEvaluation: LoadingState,
  }),
  [BenchmarkActionTypes.SET_LAST_BENCHMARK_EVALUATION]: (state, action) => ({
    ...state,
    lastEvaluation: { state: DataState.READY, data: action.payload },
  }),
}

const benchmarkReducers = (
  state = benchmarkInitialState,
  action,
): BenchmarkState =>
  actionHandlers[action.type]
    ? actionHandlers[action.type](state, action)
    : state
export default benchmarkReducers
