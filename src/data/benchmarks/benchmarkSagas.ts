import { put, takeLatest, select, call } from 'redux-saga/effects'
import {
  setBenchmarkManager,
  BenchmarkActionTypes,
  setRunningBenchmarkInfo,
  setLastBenchmarkEvaluation,
} from './benchmarkActions'
import urlBuilder, { COMPONENTS } from '../util/urlBuilder'
import sleep from '../util/sleep'
import { BenchmarkManager } from './benchmarkManagerDataType'
import { BenchmarkInfo } from './benchmarkInfoDataType'
import { RootState } from '../rootReducer'
import { fetchCaseSet as fetchCaseSetSaga } from '../caseSets/caseSetsSagas'
import { fetchCaseSet as fetchCaseSetAction } from '../caseSets/caseSetsActions'
import { BenchmarkEvaluation } from './benchmarkEvaluationDataType'

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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* fetchLastBenchmarkEvaluation() {
  let state: RootState = yield select()
  const benchmarkInfo = state.benchmark.currentBenchmarkingSession
  if (!state.caseSets[benchmarkInfo.case_set_id]) {
    yield call(fetchCaseSetSaga, fetchCaseSetAction(benchmarkInfo.case_set_id))
    state = yield select()
  }

  const caseSetLoadable = state.caseSets[benchmarkInfo.case_set_id]
  if (caseSetLoadable.loading === true) {
    throw new Error('Case set not ready for benchmark evaluation')
  }

  const { cases } = caseSetLoadable

  if (!benchmarkInfo) {
    throw new Error('No benchmark to evaluate!')
  }

  if (!benchmarkInfo.finished) {
    throw new Error('Trying to evaluate unfinished benchmark!')
  }

  const benchmarkEvaluation: BenchmarkEvaluation = {}

  const aiNames = Object.keys(benchmarkInfo.ai_reports)
  // eslint-disable-next-line no-restricted-syntax
  for (const aiName of aiNames) {
    const response = yield fetch(
      urlBuilder(COMPONENTS.METRIC_CALCULATOR, 'calculate-metrics'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          cases.map(({ caseData, valuesToPredict }, caseIndex) => ({
            caseData,
            valuesToPredict,
            aiResult: benchmarkInfo.results_by_ai[aiName][caseIndex],
          })),
        ),
      },
    )

    if (!response.ok) {
      // todo: error handling
      throw new Error('Errored while running benchmark on case set.')
    }

    const calculatedMetrics = yield response.json()

    benchmarkEvaluation[aiName] = calculatedMetrics
  }

  yield put(setLastBenchmarkEvaluation(benchmarkEvaluation))
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
  takeLatest(
    BenchmarkActionTypes.FETCH_LAST_BENCHMARK_EVALUATION,
    fetchLastBenchmarkEvaluation,
  ),
]
export default benchmarkSagas
