import { put } from 'redux-saga/effects'

import urlBuilder from '../../util/urlBuilder'
import { benchmarkingSessionListDataAction } from '../benchmarkActions'
import httpResponseErrorMessage from '../../util/httpResponseErrorMessage'
import { setFatalError } from '../../application/applicationActions'
import { BenchmarkingSession } from '../benchmarkManagerDataType'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function* fetchBenchmarkingSessionList() {
  try {
    const response = yield fetch(urlBuilder(`benchmarking-sessions`))

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response))
    }

    const benchmarkingSessions: BenchmarkingSession[] = yield response.json()

    yield put(benchmarkingSessionListDataAction.store(benchmarkingSessions))
  } catch (error) {
    yield put(
      setFatalError(
        `Errored while fetching benchmark sessions list: ${error.message}`,
      ),
    )
  }
}
