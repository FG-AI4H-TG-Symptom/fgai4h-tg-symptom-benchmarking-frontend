import { createAction } from 'redux-actions'

import { BenchmarkManager } from './benchmarkManagerDataType'
import { BenchmarkInfo } from './benchmarkInfoDataType'
import { BenchmarkEvaluation } from './benchmarkEvaluationDataType'
import generateDataStateActions from '../util/dataState/generateDataStateActions'

export enum BenchmarkActionTypes {
  BENCHMARK_MANAGER_DATA_ACTION = 'BENCHMARK_MANAGER_DATA_ACTION',
  OBSERVE_RUNNING_BENCHMARK = 'OBSERVE_RUNNING_BENCHMARK',
  SET_RUNNING_BENCHMARK_INFO = 'SET_RUNNING_BENCHMARK_INFO',
  LAST_BENCHMARK_EVALUATION_DATA_ACTION = 'LAST_BENCHMARK_EVALUATION_DATA_ACTION',
}

export type CreateBenchmarkManagerParameters = {
  caseSetId: string
  aiImplementationNames: string[]
}
export const benchmarkManagerDataAction = generateDataStateActions<
  BenchmarkManager,
  CreateBenchmarkManagerParameters
>(BenchmarkActionTypes.BENCHMARK_MANAGER_DATA_ACTION)

export const observeRunningBenchmark = createAction<string>(
  BenchmarkActionTypes.OBSERVE_RUNNING_BENCHMARK,
)
export const setRunningBenchmarkInfo = createAction<BenchmarkInfo>(
  BenchmarkActionTypes.SET_RUNNING_BENCHMARK_INFO,
)

export const lastBenchmarkEvaluationDataAction = generateDataStateActions<
  BenchmarkEvaluation
>(BenchmarkActionTypes.LAST_BENCHMARK_EVALUATION_DATA_ACTION)
