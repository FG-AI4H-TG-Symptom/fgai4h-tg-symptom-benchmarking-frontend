import { createAction } from 'redux-actions'

import { BenchmarkManager } from './benchmarkManagerDataType'
import { BenchmarkInfo } from './benchmarkInfoDataType'

export enum BenchmarkActionTypes {
  CREATE_BENCHMARK_MANAGER = 'CREATE_BENCHMARK_MANAGER',
  SET_BENCHMARK_MANAGER = 'SET_BENCHMARK_MANAGER',
  CLEAR_BENCHMARK_MANAGER = 'CLEAR_BENCHMARK_MANAGER',
  OBSERVE_RUNNING_BENCHMARK = 'OBSERVE_RUNNING_BENCHMARK',
  SET_RUNNING_BENCHMARK_INFO = 'SET_RUNNING_BENCHMARK_INFO',
}

export type CreateBenchmarkManagerParameters = {
  caseSetId: string
  aiImplementationNames: string[]
}
export const createBenchmarkManager = createAction<
  CreateBenchmarkManagerParameters
>(BenchmarkActionTypes.CREATE_BENCHMARK_MANAGER)
export const setBenchmarkManager = createAction<BenchmarkManager>(
  BenchmarkActionTypes.SET_BENCHMARK_MANAGER,
)
export const clearBenchmarkManager = createAction<void>(
  BenchmarkActionTypes.CLEAR_BENCHMARK_MANAGER,
)

export const observeRunningBenchmark = createAction<string>(
  BenchmarkActionTypes.OBSERVE_RUNNING_BENCHMARK,
)

export const setRunningBenchmarkInfo = createAction<BenchmarkInfo>(
  BenchmarkActionTypes.SET_RUNNING_BENCHMARK_INFO,
)
