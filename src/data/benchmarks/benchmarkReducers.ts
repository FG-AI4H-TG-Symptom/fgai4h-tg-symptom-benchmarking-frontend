import dotProp from 'dot-prop-immutable'

import {
  DataActionTypes,
  ID_PLACEHOLDER_NEW,
} from '../util/dataState/dataActionTypes'
import {
  InitialState,
  Loadable,
  LoadableCreateOnly,
} from '../util/dataState/dataStateTypes'
import dataStateGenericReducer from '../util/dataState/dataStateGenericReducer'

import { BenchmarkingSession } from './benchmarkManagerDataType'
import { BenchmarkActionTypes } from './benchmarkActions'
import { BenchmarkEvaluation } from './benchmarkEvaluationDataType'
import { RunningBenchmarkReport } from './benchmarkInfoDataType'

export interface BenchmarkState {
  [ID_PLACEHOLDER_NEW]: LoadableCreateOnly
  entries: {
    [benchmarkingSessionId: string]: Loadable<BenchmarkingSession>
  }
  runningBenchmarkStatus: Loadable<RunningBenchmarkReport>
}

const benchmarkInitialState: BenchmarkState = {
  [ID_PLACEHOLDER_NEW]: InitialState,
  entries: {},
  runningBenchmarkStatus: InitialState,
}

const actionHandlers: {
  [key in BenchmarkActionTypes]: (
    state: BenchmarkState,
    action,
  ) => BenchmarkState
} = {
  [BenchmarkActionTypes.CREATE_BENCHMARKING_SESSION_DATA_ACTION]: dataStateGenericReducer<
    BenchmarkState,
    BenchmarkingSession
  >({
    path: action =>
      action.payload.intent === DataActionTypes.STORE
        ? `entries.${action.payload.data.id}`
        : ID_PLACEHOLDER_NEW,
    postflightTransform: (state, action) => {
      if (action.payload.intent !== DataActionTypes.STORE) {
        return state
      }

      return dotProp.delete(state, ID_PLACEHOLDER_NEW) as BenchmarkState
    },
  }),
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
  [BenchmarkActionTypes.MARK_BENCHMARKING_SESSION_AS]: (state, action) =>
    dotProp.set(
      state,
      `entries.${action.payload.benchmarkingSessionId}.data.status`,
      action.payload.status,
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
