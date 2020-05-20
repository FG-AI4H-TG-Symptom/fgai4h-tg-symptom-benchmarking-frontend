import { put } from 'redux-saga/effects'

import urlBuilder from '../../util/urlBuilder'
import httpResponseErrorMessage from '../../util/httpResponseErrorMessage'
import { aiImplementationHealthDataAction } from '../aiImplementationsActions'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function* fetchAiImplementationHealth(
  aiImplementationId: string,
) {
  try {
    const response = yield fetch(
      urlBuilder(`ai-implementations/${aiImplementationId}/health-check`),
      {
        method: 'GET',
      },
    )

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response))
    }

    const data = yield response.json()

    yield put(
      aiImplementationHealthDataAction.store(data.status, aiImplementationId),
    )
  } catch (error) {
    yield put(
      aiImplementationHealthDataAction.errored(
        `Failed to fetch AI implementation list: ${error.message}`,
        aiImplementationId,
      ),
    )
  }
}
