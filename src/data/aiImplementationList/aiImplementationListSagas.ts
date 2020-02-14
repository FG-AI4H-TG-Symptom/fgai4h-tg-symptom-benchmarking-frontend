import { put, takeEvery } from 'redux-saga/effects'

import {
  AiImplementationListActionTypes,
  setAiImplementationHealth,
  aiImplementationListDataActions,
  aiImplementationListLoadParameters,
  fetchAiImplementationHealth as fetchAiImplementationHealthAction,
} from './aiImplementationListActions'
import urlBuilder, { COMPONENTS } from '../util/urlBuilder'
import dataStateActionSagaWrapperLoadOnly from '../util/dataState/dataStateActionSagaWrapperLoadOnly'
import { AiImplementationInfo } from './aiImplementationDataType'

type aiImplementationListServerResponse = {
  // eslint-disable-next-line camelcase
  ai_implementations: AiImplementationInfo[]
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* fetchAiImplementationList(
  parameters: aiImplementationListLoadParameters,
) {
  try {
    const response = yield fetch(
      urlBuilder(COMPONENTS.EVALUATOR, 'list-all-ai-implementations'),
      {
        method: 'GET',
      },
    )

    if (!response.ok) {
      // todo: error handling
      throw new Error('Failed to fetch AI implementation list.')
    }

    const {
      ai_implementations: aiImplementations,
    }: aiImplementationListServerResponse = yield response.json()

    yield put(aiImplementationListDataActions.store(aiImplementations))

    if (parameters && parameters.withHealth) {
      // eslint-disable-next-line no-restricted-syntax
      for (const aiImplementation of aiImplementations) {
        yield put(fetchAiImplementationHealthAction(aiImplementation.name))
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
export function* fetchAiImplementationHealth(action) {
  const aiImplementation = action.payload

  const response = yield fetch(urlBuilder(COMPONENTS.TOY_AIS, 'health-check'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ aiImplementation }),
  })

  if (!response.ok) {
    // todo: error handling
    throw new Error('Failed to fetch AI implementation list.')
  }

  const data = yield response.json()

  yield put(
    setAiImplementationHealth({ name: aiImplementation, health: data.status }),
  )
}

const aiImplementationListSagas = [
  dataStateActionSagaWrapperLoadOnly(
    AiImplementationListActionTypes.AI_IMPLEMENTATION_LIST_DATA,
    fetchAiImplementationList,
  ),
  takeEvery(
    AiImplementationListActionTypes.FETCH_AI_IMPLEMENTATION_HEALTH,
    fetchAiImplementationHealth,
  ),
]
export default aiImplementationListSagas
