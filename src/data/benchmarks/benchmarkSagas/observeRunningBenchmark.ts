import { put } from 'redux-saga/effects'

import urlBuilder, { COMPONENTS } from '../../util/urlBuilder'
import { BenchmarkInfo } from '../benchmarkInfoDataType'
import { setRunningBenchmarkInfo } from '../benchmarkActions'
import sleep from '../../util/sleep'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function* observeRunningBenchmark(action) {
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
      break
    }

    yield sleep(100)
  }
}
