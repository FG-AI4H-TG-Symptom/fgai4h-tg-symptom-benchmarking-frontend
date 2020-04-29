import { put } from 'redux-saga/effects'

import urlBuilder from '../../util/urlBuilder'
import httpResponseErrorMessage from '../../util/httpResponseErrorMessage'
import { benchmarkEvaluationDataAction } from '../benchmarkActions'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function* fetchBenchmarkEvaluation(
  benchmarkingSessionId,
  metadata,
) {
  try {
    // todo: metrics calculation not implemented yet
    const response: Response = yield fetch(
      urlBuilder(`benchmarking-sessions/${benchmarkingSessionId}/results`),
    )

    if (!response.ok) {
      throw new Error(
        httpResponseErrorMessage(response, `fetch benchmark results`),
      )
    }

    const results = yield response.json()

    yield put(benchmarkEvaluationDataAction.store(results, metadata))
  } catch (error) {
    yield put(
      benchmarkEvaluationDataAction.errored(
        `Errored while running benchmark on case set: ${error.message}`,
        metadata,
      ),
    )
  }
}
