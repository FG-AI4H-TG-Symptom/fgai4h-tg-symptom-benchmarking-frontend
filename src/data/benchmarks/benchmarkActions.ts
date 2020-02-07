import { createAction } from 'redux-actions'

import { BenchmarkManager } from './benchmarkManagerDataType'
import { BenchmarkInfo } from './benchmarkInfoDataType'

export enum BenchmarkActionTypes {
  REQUEST_BENCHMARK_MANAGER = 'REQUEST_BENCHMARK_MANAGER',
  SET_BENCHMARK_MANAGER = 'SET_BENCHMARK_MANAGER',
  RUN_BENCHMARK_ON_CASE_SET = 'RUN_BENCHMARK_ON_CASE_SET',
  SET_CURRENT_BENCHMARK_INFO = 'SET_CURRENT_BENCHMARK_INFO',
}

export const requestBenchmarkManager = createAction<void>(
  BenchmarkActionTypes.REQUEST_BENCHMARK_MANAGER,
)
export const setBenchmarkManager = createAction<BenchmarkManager>(
  BenchmarkActionTypes.SET_BENCHMARK_MANAGER,
)

export const runBenchmarkOnCaseSet = createAction<{
  caseSetId: string
  benchmarkManagerId: string
  aiImplementationNames: string[]
}>(BenchmarkActionTypes.RUN_BENCHMARK_ON_CASE_SET)

export const setCurrentBenchmarkInfo = createAction<BenchmarkInfo>(
  BenchmarkActionTypes.SET_CURRENT_BENCHMARK_INFO,
)
