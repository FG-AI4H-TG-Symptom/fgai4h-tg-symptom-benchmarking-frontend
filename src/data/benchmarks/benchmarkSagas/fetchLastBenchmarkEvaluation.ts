import { call, put, select } from 'redux-saga/effects'

import { RootState } from '../../rootReducer'
import { fetchCaseSet as fetchCaseSetSaga } from '../../caseSets/caseSetsSagas'
import { fetchCaseSet as fetchCaseSetAction } from '../../caseSets/caseSetsActions'
import { BenchmarkEvaluation } from '../benchmarkEvaluationDataType'
import urlBuilder, { COMPONENTS } from '../../util/urlBuilder'
import { lastBenchmarkEvaluationDataAction } from '../benchmarkActions'
import { DataState } from '../../util/dataState/dataStateTypes'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function* fetchLastBenchmarkEvaluation() {
  let state: RootState = yield select()
  const benchmarkInfo = state.benchmark.currentBenchmarkingSession
  if (!state.caseSets[benchmarkInfo.case_set_id]) {
    yield call(fetchCaseSetSaga, fetchCaseSetAction(benchmarkInfo.case_set_id))
    state = yield select()
  }

  const caseSetLoadable = state.caseSets[benchmarkInfo.case_set_id]
  if (caseSetLoadable.state !== DataState.READY) {
    throw new Error('Case set not ready for benchmark evaluation')
  }

  const cases = caseSetLoadable.data

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

  yield put(lastBenchmarkEvaluationDataAction.store(benchmarkEvaluation))
}
