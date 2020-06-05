import { put } from 'redux-saga/effects'

import { setFatalError } from '../../application/applicationActions'
import urlBuilder from '../../util/urlBuilder'
import httpResponseErrorMessage from '../../util/httpResponseErrorMessage'
import { CallbackMetadata } from '../../util/dataState/generateDataStateActions'
import {
  BenchmarkingSession,
  BenchmarkingSessionStatus,
} from '../benchmarkManagerDataType'
import {
  createBenchmarkingSessionDataAction,
  CreateBenchmarkManagerParameters,
  markBenchmarkingSessionAs,
} from '../benchmarkActions'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function* createBenchmarkManager(
  parameters: CreateBenchmarkManagerParameters,
  metadata: CallbackMetadata<BenchmarkingSession>,
) {
  try {
    const { caseSetId, aiImplementationIds } = parameters

    // todo: adapt to new endpoint
    const response = yield fetch(urlBuilder('benchmarking-sessions'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        caseSet: caseSetId,
        aiImplementations: aiImplementationIds,
      }),
    })

    if (!response.ok) {
      throw new Error(
        httpResponseErrorMessage(response, 'create benchmark manager'),
      )
    }

    const benchmarkingSession: BenchmarkingSession = yield response.json()

    yield put(
      createBenchmarkingSessionDataAction.store(benchmarkingSession, metadata),
    )

    const startBenchmarkingResponse = yield fetch(
      urlBuilder(`benchmarking-sessions/${benchmarkingSession.id}/run`),
      {
        method: 'POST',
      },
    )

    if (!startBenchmarkingResponse.ok) {
      throw new Error(httpResponseErrorMessage(response, 'start benchmark'))
    }

    yield put(
      markBenchmarkingSessionAs({
        benchmarkingSessionId: benchmarkingSession.id,
        status: BenchmarkingSessionStatus.RUNNING,
      }),
    )
  } catch (error) {
    yield put(
      setFatalError(`Failed to run benchmark on case set: ${error.message}`),
    )
  }
}
