import { put, takeLatest } from 'redux-saga/effects'

import { CaseSetListActionTypes, setCaseSetList } from './caseSetListActions'
import urlBuilder from '../util/urlBuilder'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* fetchCaseSetList() {
  const response = yield fetch(urlBuilder('list-case-sets'), {
    method: 'GET',
  })

  if (!response.ok) {
    // todo: error handling
    throw new Error('Failed to fetch case set list.')
  }

  const data = yield response.json()

  yield put(setCaseSetList(data.existing_case_sets))
}

const caseSetsSagas = [
  takeLatest(CaseSetListActionTypes.FETCH_CASE_SET_LIST, fetchCaseSetList),
]
export default caseSetsSagas
