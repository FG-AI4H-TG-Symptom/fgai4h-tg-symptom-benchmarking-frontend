import { BenchmarkActionTypes } from '../benchmarkActions'
import createBenchmarkingSession from './createBenchmarkManager'
import observeRunningBenchmark from './observeRunningBenchmark'
import fetchBenchmarkEvaluation from './fetchBenchmarkEvaluation'
import dataStateActionSagaWrapperLoadOnly from '../../util/dataState/dataStateActionSagaWrapperLoadOnly'
import fetchBenchmarkingSession from './fetchBenchmarkingSession'

const benchmarkSagas = [
  dataStateActionSagaWrapperLoadOnly(
    BenchmarkActionTypes.CREATE_BENCHMARKING_SESSION_DATA_ACTION,
    createBenchmarkingSession,
  ),
  dataStateActionSagaWrapperLoadOnly(
    BenchmarkActionTypes.OBSERVE_RUNNING_BENCHMARK_DATA_ACTION,
    observeRunningBenchmark,
  ),
  dataStateActionSagaWrapperLoadOnly(
    BenchmarkActionTypes.BENCHMARK_EVALUATION_DATA_ACTION,
    fetchBenchmarkEvaluation,
  ),
  dataStateActionSagaWrapperLoadOnly(
    BenchmarkActionTypes.BENCHMARKING_SESSION_DATA_ACTION,
    fetchBenchmarkingSession,
  ),
]
export default benchmarkSagas
