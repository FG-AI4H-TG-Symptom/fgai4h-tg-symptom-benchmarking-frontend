import { put } from 'redux-saga/effects'

import urlBuilder, { COMPONENTS } from '../../util/urlBuilder'
import { BenchmarkInfo } from '../benchmarkInfoDataType'
import { setRunningBenchmarkInfo } from '../benchmarkActions'
import sleep from '../../util/sleep'
import httpResponseErrorMessage from '../../util/httpResponseErrorMessage'
import { setFatalError } from '../../application/applicationActions'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function* observeRunningBenchmark(action) {
  try {
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
        throw new Error(httpResponseErrorMessage(response))
      }

      const benchmarkInfo: BenchmarkInfo = yield response.json()
      benchmarkInfo.finished = benchmarkInfo.logs.some(log =>
        log.includes('Finished'),
      )

      yield put(setRunningBenchmarkInfo(benchmarkInfo))

      if (benchmarkInfo.finished) {
        break
      }

      yield sleep(100)
    }
  } catch (error) {
    yield put(
      setFatalError(
        `Errored while running benchmark on case set: ${error.message}`,
      ),
    )
  }
}
