import dotProp from 'dot-prop-immutable'

import {
  DataActionBaseState,
  dataActionBaseStateInitial,
  InitialState,
  Loadable,
} from '../util/dataState/dataStateTypes'
import dataStateGenericReducer, {
  createOptions,
  deleteOptions,
} from '../util/dataState/dataStateGenericReducer'

import { BenchmarkingSession } from './benchmarkManagerDataType'
import { BenchmarkActionTypes } from './benchmarkActions'
import { BenchmarkEvaluation } from './benchmarkEvaluationDataType'
import { RunningBenchmarkReport } from './benchmarkInfoDataType'
import { CallbackMetadata } from '../util/dataState/generateDataStateActions'

export type BenchmarkState = DataActionBaseState<BenchmarkingSession> & {
  runningBenchmarkStatus: Loadable<RunningBenchmarkReport>
}

const benchmarkInitialState: BenchmarkState = Object.assign(
  dataActionBaseStateInitial<BenchmarkingSession>(),
  {
    runningBenchmarkStatus: InitialState,
  },
)

const actionHandlers: {
  [key in BenchmarkActionTypes]: (
    state: BenchmarkState,
    action,
  ) => BenchmarkState
} = {
  [BenchmarkActionTypes.CREATE_BENCHMARKING_SESSION_DATA_ACTION]: dataStateGenericReducer<
    BenchmarkState,
    BenchmarkingSession
  >(createOptions<BenchmarkingSession, BenchmarkState, void>()),
  [BenchmarkActionTypes.OBSERVE_RUNNING_BENCHMARK_DATA_ACTION]: dataStateGenericReducer<
    BenchmarkState,
    RunningBenchmarkReport
  >({ path: 'runningBenchmarkStatus' }),
  [BenchmarkActionTypes.BENCHMARK_EVALUATION_DATA_ACTION]: dataStateGenericReducer<
    BenchmarkState,
    BenchmarkEvaluation,
    undefined,
    { benchmarkingSessionId: string }
  >({
    path: action => `entries.${action.meta.benchmarkingSessionId}.data.results`,
  }),
  [BenchmarkActionTypes.BENCHMARKING_SESSION_DATA_ACTION]: dataStateGenericReducer<
    BenchmarkState,
    BenchmarkingSession,
    undefined,
    { benchmarkingSessionId: string }
  >({ path: action => `entries.${action.meta.benchmarkingSessionId}` }),
  [BenchmarkActionTypes.BENCHMARKING_SESSION_LIST_DATA_ACTION]: dataStateGenericReducer<
    BenchmarkState,
    BenchmarkingSession
  >({ path: 'overview' }),
  [BenchmarkActionTypes.MARK_BENCHMARKING_SESSION_AS]: (state, action) =>
    dotProp.set(
      state,
      `entries.${action.payload.benchmarkingSessionId}.data.status`,
      action.payload.status,
    ),
  [BenchmarkActionTypes.BENCHMARKING_SESSION_DELETE_DATA_ACTION]: dataStateGenericReducer<
    BenchmarkState,
    void,
    void,
    { benchmarkingSessionId: string } & CallbackMetadata<void>
  >(
    deleteOptions<BenchmarkingSession, BenchmarkState>('benchmarkingSessionId'),
  ),
}

const benchmarkReducers = (
  state = benchmarkInitialState,
  action,
): BenchmarkState =>
  actionHandlers[action.type]
    ? actionHandlers[action.type](state, action)
    : state
export default benchmarkReducers
