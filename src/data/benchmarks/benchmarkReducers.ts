import { BenchmarkManager } from './benchmarkManagerDataType'
import { DataState, Initial, Loadable } from '../../components/util/UtilTypes'
import { BenchmarkActionTypes } from './benchmarkActions'
import { BenchmarkInfo } from './benchmarkInfoDataType'

export interface BenchmarkState {
  benchmarkManager: Loadable<BenchmarkManager>
  currentBenchmarkingSession?: BenchmarkInfo
}

const benchmarkInitialState: BenchmarkState = {
  benchmarkManager: Initial,
}

const actionHandlers: {
  [key in BenchmarkActionTypes]: (
    state: BenchmarkState,
    action,
  ) => BenchmarkState
} = {
  [BenchmarkActionTypes.REQUEST_BENCHMARK_MANAGER]: state => ({
    ...state,
    benchmarkManager: { state: DataState.LOADING },
  }),
  [BenchmarkActionTypes.SET_BENCHMARK_MANAGER]: (state, action) => ({
    ...state,
    benchmarkManager: { state: DataState.READY, data: action.payload },
  }),
  [BenchmarkActionTypes.RUN_BENCHMARK_ON_CASE_SET]: state => state,
  [BenchmarkActionTypes.SET_CURRENT_BENCHMARK_INFO]: (state, action) => ({
    ...state,
    currentBenchmarkingSession: action.payload,
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
