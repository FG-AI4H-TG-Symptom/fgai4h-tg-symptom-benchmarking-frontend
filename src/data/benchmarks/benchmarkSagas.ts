import { put, takeLatest } from 'redux-saga/effects'
import {
  setBenchmarkManager,
  BenchmarkActionTypes,
  setCurrentBenchmarkInfo,
} from './benchmarkActions'
import urlBuilder, { COMPONENTS } from '../util/urlBuilder'
import sleep from '../util/sleep'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* requestBenchmarkManager() {
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

  const data = yield response.json()

  yield put(setBenchmarkManager(data))
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* runBenchmarkOnCaseSet(action) {
  const {
    caseSetId,
    benchmarkManagerId,
    aiImplementationNames,
  } = action.payload

  const startBenchmarkingResponse = yield fetch(
    urlBuilder(COMPONENTS.EVALUATOR, 'run-case-set-against-all-ais'),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        benchmarkManagerId,
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

    const data = yield response.json()

    yield put(setCurrentBenchmarkInfo(data))

    if (data.logs.some(log => log.includes('Finished'))) {
      // todo: notify components about benchmark run state
      break
    }

    yield sleep(100)
  }
}

const benchmarkSagas = [
  takeLatest(
    BenchmarkActionTypes.REQUEST_BENCHMARK_MANAGER,
    requestBenchmarkManager,
  ),
  takeLatest(
    BenchmarkActionTypes.RUN_BENCHMARK_ON_CASE_SET,
    runBenchmarkOnCaseSet,
  ),
]
export default benchmarkSagas
