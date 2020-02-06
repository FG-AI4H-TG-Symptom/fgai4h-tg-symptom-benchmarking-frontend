import { put, takeLatest } from 'redux-saga/effects'
import { addCaseSet, CaseSetsActionTypes } from './caseSetsActions'
import urlBuilder from '../util/urlBuilder'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* fetchCaseSet(action) {
  const caseSetId = action.payload

  const response = yield fetch(urlBuilder('extract-case-set'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(caseSetId),
  })

  if (!response.ok) {
    // todo: error handling
    throw new Error('Failed to fetch case set.')
  }

  const data = yield response.json()

  yield put(addCaseSet({ caseSetId, cases: data.cases }))
}

const caseSetsSagas = [
  takeLatest(CaseSetsActionTypes.FETCH_CASE_SET, fetchCaseSet),
]
export default caseSetsSagas
