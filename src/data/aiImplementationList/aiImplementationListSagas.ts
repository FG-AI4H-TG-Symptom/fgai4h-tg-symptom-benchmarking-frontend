import { put, takeLatest } from 'redux-saga/effects'

import {
  AiImplementationListActionTypes,
  setAiImplementationList,
} from './aiImplementationListActions'
import urlBuilder from '../util/urlBuilder'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* fetchAiImplementationList() {
  const response = yield fetch(urlBuilder('list-all-ai-implementations'), {
    method: 'GET',
  })

  if (!response.ok) {
    // todo: error handling
    throw new Error('Failed to fetch AI implementation list.')
  }

  const data = yield response.json()

  yield put(setAiImplementationList(data.ai_implementations))
}

const aiImplementationListSagas = [
  takeLatest(
    AiImplementationListActionTypes.FETCH_AI_IMPLEMENTATION_LIST,
    fetchAiImplementationList,
  ),
]
export default aiImplementationListSagas
