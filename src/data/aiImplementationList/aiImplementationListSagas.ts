import { put } from 'redux-saga/effects'

import urlBuilder from '../util/urlBuilder'
import dataStateActionSagaWrapperLoadOnly from '../util/dataState/dataStateActionSagaWrapperLoadOnly'
import httpResponseErrorMessage from '../util/httpResponseErrorMessage'

import { AiImplementationInfo } from './aiImplementationDataType'
import {
  AiImplementationListActionTypes,
  aiImplementationListDataActions,
  aiImplementationHealthDataActions,
  AiImplementationListLoadParameters,
} from './aiImplementationListActions'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* fetchAiImplementationList(
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* fetchAiImplementationHealth(aiImplementationId: string) {
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
      aiImplementationHealthDataActions.store(data.status, aiImplementationId),
    )
  } catch (error) {
    yield put(
      aiImplementationHealthDataActions.errored(
        `Failed to fetch AI implementation list: ${error.message}`,
        aiImplementationId,
      ),
    )
  }
}

const aiImplementationListSagas = [
  dataStateActionSagaWrapperLoadOnly(
    AiImplementationListActionTypes.AI_IMPLEMENTATION_LIST_DATA_ACTION,
    fetchAiImplementationList,
  ),
  dataStateActionSagaWrapperLoadOnly(
    AiImplementationListActionTypes.AI_IMPLEMENTATION_HEALTH_DATA_ACTION,
    fetchAiImplementationHealth,
  ),
]
export default aiImplementationListSagas
