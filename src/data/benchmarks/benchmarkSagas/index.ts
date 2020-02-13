import { takeLatest } from 'redux-saga/effects'

import { BenchmarkActionTypes } from '../benchmarkActions'
import createBenchmarkManager from './createBenchmarkManager'
import observeRunningBenchmark from './observeRunningBenchmark'
import fetchLastBenchmarkEvaluation from './fetchLastBenchmarkEvaluation'

const benchmarkSagas = [
  takeLatest(
    BenchmarkActionTypes.CREATE_BENCHMARK_MANAGER,
    createBenchmarkManager,
  ),
  takeLatest(
    BenchmarkActionTypes.OBSERVE_RUNNING_BENCHMARK,
    observeRunningBenchmark,
  ),
  takeLatest(
    BenchmarkActionTypes.FETCH_LAST_BENCHMARK_EVALUATION,
    fetchLastBenchmarkEvaluation,
  ),
]
export default benchmarkSagas
