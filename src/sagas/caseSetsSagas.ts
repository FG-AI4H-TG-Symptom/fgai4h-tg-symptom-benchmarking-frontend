import { takeLatest, put } from 'redux-saga/effects'
import { addCaseSet, loadingCaseSet } from '../actions/caseSetsActions'

export function* fetchCaseSet(action) {
  const PROTOCOL = 'http'
  const HOSTNAME = 'localhost'

  const caseSetId = action.payload

  yield put(loadingCaseSet(caseSetId))

  const response = yield fetch(
    `${PROTOCOL}://${HOSTNAME}:5003/evaluator/v1/extract-case-set`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(caseSetId),
    }
  )

  if (!response.ok) {
    // todo: error handling
    throw new Error('Failed to fetch case set.')
  }

  const data = yield response.json()

  yield put(addCaseSet({ caseSetId, cases: data.cases }))
}

export const caseSetsSagas = [
  takeLatest('FETCH_CASE_SET', fetchCaseSet)
]
