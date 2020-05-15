import { put } from 'redux-saga/effects'

import urlBuilder from '../../util/urlBuilder'
import httpResponseErrorMessage from '../../util/httpResponseErrorMessage'

import { AiImplementationInfo } from '../aiImplementationDataType'
import {
  aiImplementationListDataActions,
  aiImplementationHealthDataActions,
  AiImplementationListLoadParameters,
} from '../aiImplementationListActions'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function* fetchAiImplementationList(
  parameters: AiImplementationListLoadParameters,
) {
  try {
    const response: Response = yield fetch(urlBuilder('ai-implementations'), {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response))
    }

    const aiImplementations: AiImplementationInfo[] = yield response.json()

    yield put(aiImplementationListDataActions.store(aiImplementations))

    if (parameters && parameters.withHealth) {
      // eslint-disable-next-line no-restricted-syntax
      for (const aiImplementation of aiImplementations) {
        yield put(
          aiImplementationHealthDataActions.load(
            aiImplementation.id,
            aiImplementation.id,
          ),
        )
      }
    }
  } catch (error) {
    yield put(
      aiImplementationListDataActions.errored(
        `Failed to load AI implementations: ${error.message}`,
      ),
    )
  }
}
