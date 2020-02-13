import { put, takeLatest } from 'redux-saga/effects'
import {
  setBenchmarkManager,
  BenchmarkActionTypes,
  setRunningBenchmarkInfo,
} from './benchmarkActions'
import urlBuilder, { COMPONENTS } from '../util/urlBuilder'
import sleep from '../util/sleep'
import { BenchmarkManager } from './benchmarkManagerDataType'
import { BenchmarkInfo } from './benchmarkInfoDataType'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* createBenchmarkManager(action) {
  const { caseSetId, aiImplementationNames } = action.payload

  const response = yield fetch(
    urlBuilder(COMPONENTS.EVALUATOR, 'create-benchmark-manager'),
    {
      method: 'GET',
    },
  )

  if (!response.ok) {
    // todo: error handling
    throw new Error('Failed to request benchmark manager.')
  }

  const benchmarkManager: BenchmarkManager = yield response.json()

  yield put(setBenchmarkManager(benchmarkManager))

  const startBenchmarkingResponse = yield fetch(
    urlBuilder(COMPONENTS.EVALUATOR, 'run-case-set-against-all-ais'),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        benchmarkManagerId: benchmarkManager.benchmarkManagerId,
        caseSetId,
        aiImplementations: aiImplementationNames,
      }),
    },
  )

  if (!startBenchmarkingResponse.ok) {
    // todo: error handling
    throw new Error('Failed to run benchmark on case set.')
  }

  const startBenchmarkingData = yield startBenchmarkingResponse.json()

  if (startBenchmarkingData !== 'Started') {
    // todo: error handling
    throw new Error('Failed to run benchmark on case set.')
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* observeRunningBenchmark(action) {
  const benchmarkManagerId: string = action.payload

  while (true) {
    const response = yield fetch(
      urlBuilder(COMPONENTS.EVALUATOR, 'report-update'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          benchmarkId: benchmarkManagerId,
        }),
      },
    )

    if (!response.ok) {
      // todo: error handling
      throw new Error('Errored while running benchmark on case set.')
    }

    const benchmarkInfo: BenchmarkInfo = yield response.json()
    benchmarkInfo.finished = benchmarkInfo.logs.some(log =>
      log.includes('Finished'),
    )

    yield put(setRunningBenchmarkInfo(benchmarkInfo))

    if (benchmarkInfo.finished) {
      // todo: notify components about benchmark run state
      break
    }

    yield sleep(100)
  }
}

const benchmarkSagas = [
  takeLatest(
    BenchmarkActionTypes.CREATE_BENCHMARK_MANAGER,
    createBenchmarkManager,
  ),
  takeLatest(
    BenchmarkActionTypes.OBSERVE_RUNNING_BENCHMARK,
    observeRunningBenchmark,
  ),
]
export default benchmarkSagas
