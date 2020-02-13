import { put } from 'redux-saga/effects'

import urlBuilder, { COMPONENTS } from '../../util/urlBuilder'
import { BenchmarkManager } from '../benchmarkManagerDataType'
import { setBenchmarkManager } from '../benchmarkActions'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function* createBenchmarkManager(action) {
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
