import { createAction } from 'redux-actions'

import generateDataStateActions, {
  CallbackMetadata,
} from '../util/dataState/generateDataStateActions'

import {
  BenchmarkingSession,
  BenchmarkingSessionStatus,
} from './benchmarkManagerDataType'
import { RunningBenchmarkReport } from './benchmarkInfoDataType'
import { BenchmarkEvaluation } from './benchmarkEvaluationDataType'

export enum BenchmarkActionTypes {
  CREATE_BENCHMARKING_SESSION_DATA_ACTION = 'CREATE_BENCHMARKING_SESSION_DATA_ACTION',
  OBSERVE_RUNNING_BENCHMARK_DATA_ACTION = 'OBSERVE_RUNNING_BENCHMARK_DATA_ACTION',
  BENCHMARK_EVALUATION_DATA_ACTION = 'BENCHMARK_EVALUATION_DATA_ACTION',
  BENCHMARKING_SESSION_DATA_ACTION = 'BENCHMARKING_SESSION_DATA_ACTION',
  MARK_BENCHMARKING_SESSION_AS = 'MARK_BENCHMARKING_SESSION_AS',
}

export type CreateBenchmarkManagerParameters = {
  caseSetId: string
  aiImplementationIds: string[]
}
export const createBenchmarkingSessionDataAction = generateDataStateActions<
  BenchmarkingSession,
  CreateBenchmarkManagerParameters,
  void,
  CallbackMetadata<BenchmarkingSession>
>(BenchmarkActionTypes.CREATE_BENCHMARKING_SESSION_DATA_ACTION)

export const observeRunningBenchmarkDataAction = generateDataStateActions<
  RunningBenchmarkReport,
  string
>(BenchmarkActionTypes.OBSERVE_RUNNING_BENCHMARK_DATA_ACTION)

export const benchmarkEvaluationDataAction = generateDataStateActions<
  BenchmarkEvaluation,
  string,
  { benchmarkingSessionId: string }
>(BenchmarkActionTypes.BENCHMARK_EVALUATION_DATA_ACTION)

export const benchmarkingSessionDataAction = generateDataStateActions<
  BenchmarkingSession,
  string,
  { benchmarkingSessionId: string }
>(BenchmarkActionTypes.BENCHMARKING_SESSION_DATA_ACTION)

export const markBenchmarkingSessionAs = createAction<{
  benchmarkingSessionId: string
  status: BenchmarkingSessionStatus
}>(BenchmarkActionTypes.MARK_BENCHMARKING_SESSION_AS)
