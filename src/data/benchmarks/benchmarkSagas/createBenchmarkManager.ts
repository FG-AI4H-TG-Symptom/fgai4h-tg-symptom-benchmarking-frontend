import { put } from 'redux-saga/effects'

import urlBuilder, { COMPONENTS } from '../../util/urlBuilder'
import { BenchmarkManager } from '../benchmarkManagerDataType'
import {
  benchmarkManagerDataAction,
  CreateBenchmarkManagerParameters,
} from '../benchmarkActions'
import httpResponseErrorMessage from '../../util/httpResponseErrorMessage'
import { setFatalError } from '../../application/applicationActions'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function* createBenchmarkManager(
  parameters: CreateBenchmarkManagerParameters,
) {
  try {
    const { caseSetId, aiImplementationNames } = parameters

    const response = yield fetch(
      urlBuilder(COMPONENTS.EVALUATOR, 'create-benchmark-manager'),
      {
        method: 'GET',
      },
    )

    if (!response.ok) {
      throw new Error(
        httpResponseErrorMessage(response, 'create benchmark manager'),
      )
    }

    const benchmarkManager: BenchmarkManager = yield response.json()

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
      throw new Error(httpResponseErrorMessage(response, 'start benchmark'))
    }

    const startBenchmarkingData = yield startBenchmarkingResponse.json()

    if (startBenchmarkingData !== 'Started') {
      throw new Error(
        `Unexpected response from server: ${startBenchmarkingData}`,
      )
    }

    yield put(benchmarkManagerDataAction.store(benchmarkManager))
  } catch (error) {
    yield put(
      setFatalError(`Failed to run benchmark on case set: ${error.message}`),
    )
  }
}
