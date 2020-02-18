import { put } from 'redux-saga/effects'

import {
  AiImplementationListActionTypes,
  aiImplementationListDataActions,
  aiImplementationHealthDataActions,
  aiImplementationListLoadParameters,
} from './aiImplementationListActions'
import urlBuilder, { COMPONENTS } from '../util/urlBuilder'
import dataStateActionSagaWrapperLoadOnly from '../util/dataState/dataStateActionSagaWrapperLoadOnly'
import { AiImplementationInfo } from './aiImplementationDataType'
import httpResponseErrorMessage from '../util/httpResponseErrorMessage'

type aiImplementationListServerResponse = {
  // eslint-disable-next-line camelcase
  ai_implementations: AiImplementationInfo[]
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* fetchAiImplementationList(
  parameters: aiImplementationListLoadParameters,
) {
  try {
    const response: Response = yield fetch(
      urlBuilder(COMPONENTS.EVALUATOR, 'list-all-ai-implementations'),
      {
        method: 'GET',
      },
    )

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response))
    }

    const {
      ai_implementations: aiImplementations,
    }: aiImplementationListServerResponse = yield response.json()

    yield put(aiImplementationListDataActions.store(aiImplementations))

    if (parameters && parameters.withHealth) {
      // eslint-disable-next-line no-restricted-syntax
      for (const aiImplementation of aiImplementations) {
        yield put(
          aiImplementationHealthDataActions.load(
            aiImplementation.name,
            aiImplementation.name,
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
export function* fetchAiImplementationHealth(aiImplementationName: string) {
  try {
    const response = yield fetch(
      urlBuilder(COMPONENTS.TOY_AIS, 'health-check'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aiImplementation: aiImplementationName }),
      },
    )

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response))
    }

    const data = yield response.json()

    yield put(
      aiImplementationHealthDataActions.store(
        data.status,
        aiImplementationName,
      ),
    )
  } catch (error) {
    yield put(
      aiImplementationHealthDataActions.errored(
        `Failed to fetch AI implementation list: ${error.message}`,
        aiImplementationName,
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
