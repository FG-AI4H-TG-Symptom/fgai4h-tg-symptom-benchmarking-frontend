import { put } from 'redux-saga/effects'

import urlBuilder from '../../util/urlBuilder'
import { RunningBenchmarkReport } from '../benchmarkInfoDataType'
import {
  markBenchmarkingSessionAs,
  observeRunningBenchmarkDataAction,
} from '../benchmarkActions'
import sleep from '../../util/sleep'
import httpResponseErrorMessage from '../../util/httpResponseErrorMessage'
import { setFatalError } from '../../application/applicationActions'
import { BenchmarkingSessionStatus } from '../benchmarkManagerDataType'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function* observeRunningBenchmark(benchmarkManagerId: string) {
  try {
    while (true) {
      const response = yield fetch(
        urlBuilder(`benchmarking-sessions/${benchmarkManagerId}/status`),
      )

      if (!response.ok) {
        throw new Error(httpResponseErrorMessage(response))
      }

      const benchmarkInfo: {
        status: BenchmarkingSessionStatus
        report: RunningBenchmarkReport
      } = yield response.json()

      if (benchmarkInfo.status === BenchmarkingSessionStatus.RUNNING) {
        yield put(observeRunningBenchmarkDataAction.store(benchmarkInfo.report))
      } else if (benchmarkInfo.status === BenchmarkingSessionStatus.FINISHED) {
        // todo: always implicitly call when storing benchmark info
        yield put(
          markBenchmarkingSessionAs({
            benchmarkingSessionId: benchmarkManagerId,
            status: BenchmarkingSessionStatus.FINISHED,
          }),
        )

        yield put(observeRunningBenchmarkDataAction.reset())

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
