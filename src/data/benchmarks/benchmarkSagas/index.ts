import { takeLatest } from 'redux-saga/effects'

import { BenchmarkActionTypes } from '../benchmarkActions'
import createBenchmarkManager from './createBenchmarkManager'
import observeRunningBenchmark from './observeRunningBenchmark'
import fetchLastBenchmarkEvaluation from './fetchLastBenchmarkEvaluation'
import dataStateActionSagaWrapperLoadOnly from '../../util/dataState/dataStateActionSagaWrapperLoadOnly'

const benchmarkSagas = [
  dataStateActionSagaWrapperLoadOnly(
    BenchmarkActionTypes.BENCHMARK_MANAGER_DATA_ACTION,
    createBenchmarkManager,
  ),
  takeLatest(
    BenchmarkActionTypes.OBSERVE_RUNNING_BENCHMARK,
    observeRunningBenchmark,
  ),
  dataStateActionSagaWrapperLoadOnly(
    BenchmarkActionTypes.LAST_BENCHMARK_EVALUATION_DATA_ACTION,
    fetchLastBenchmarkEvaluation,
  ),
]
export default benchmarkSagas
