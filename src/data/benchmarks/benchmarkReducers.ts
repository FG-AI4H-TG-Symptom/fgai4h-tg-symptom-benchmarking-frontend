import { BenchmarkManager } from './benchmarkManagerDataType'
import { InitialState, Loadable } from '../util/dataState/dataStateTypes'
import { BenchmarkActionTypes } from './benchmarkActions'
import { BenchmarkInfo } from './benchmarkInfoDataType'
import { BenchmarkEvaluation } from './benchmarkEvaluationDataType'
import dataStateGenericReducer from '../util/dataState/dataStateGenericReducer'

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
  [BenchmarkActionTypes.BENCHMARK_MANAGER_DATA_ACTION]: dataStateGenericReducer<
    BenchmarkState,
    BenchmarkManager
  >({ path: 'benchmarkManager' }),
  [BenchmarkActionTypes.OBSERVE_RUNNING_BENCHMARK]: state => state,
  [BenchmarkActionTypes.SET_RUNNING_BENCHMARK_INFO]: (state, action) => ({
    ...state,
    currentBenchmarkingSession: action.payload,
  }),
  [BenchmarkActionTypes.LAST_BENCHMARK_EVALUATION_DATA_ACTION]: dataStateGenericReducer<
    BenchmarkState,
    BenchmarkEvaluation
  >({ path: 'lastEvaluation' }),
}

const benchmarkReducers = (
  state = benchmarkInitialState,
  action,
): BenchmarkState =>
  actionHandlers[action.type]
    ? actionHandlers[action.type](state, action)
    : state
export default benchmarkReducers
