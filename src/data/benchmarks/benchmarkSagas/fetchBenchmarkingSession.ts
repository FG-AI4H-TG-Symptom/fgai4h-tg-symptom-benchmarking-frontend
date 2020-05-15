import { put } from 'redux-saga/effects'

import urlBuilder from '../../util/urlBuilder'
import { benchmarkingSessionDataAction } from '../benchmarkActions'
import httpResponseErrorMessage from '../../util/httpResponseErrorMessage'
import { setFatalError } from '../../application/applicationActions'
import { BenchmarkingSession } from '../benchmarkManagerDataType'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function* fetchBenchmarkingSession(
  benchmarkManagerId,
  metadata,
) {
  try {
    const response = yield fetch(
      urlBuilder(`benchmarking-sessions/${benchmarkManagerId}`),
    )

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response))
    }

    const benchmarkManager: BenchmarkingSession = yield response.json()

    yield put(benchmarkingSessionDataAction.store(benchmarkManager, metadata))
  } catch (error) {
    yield put(
      setFatalError(
        `Errored while running benchmark on case set: ${error.message}`,
      ),
    )
  }
}
