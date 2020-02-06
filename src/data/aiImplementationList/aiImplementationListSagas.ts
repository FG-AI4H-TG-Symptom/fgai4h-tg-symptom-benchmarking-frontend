import { put, takeEvery, takeLatest } from 'redux-saga/effects'

import {
  AiImplementationListActionTypes,
  setAiImplementationHealth,
  setAiImplementationList,
} from './aiImplementationListActions'
import urlBuilder, { COMPONENTS } from '../util/urlBuilder'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* fetchAiImplementationList() {
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

  const data = yield response.json()

  yield put(setAiImplementationList(data.ai_implementations))
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
  takeLatest(
    AiImplementationListActionTypes.FETCH_AI_IMPLEMENTATION_LIST,
    fetchAiImplementationList,
  ),
  takeEvery(
    AiImplementationListActionTypes.FETCH_AI_IMPLEMENTATION_HEALTH,
    fetchAiImplementationHealth,
  ),
]
export default aiImplementationListSagas
