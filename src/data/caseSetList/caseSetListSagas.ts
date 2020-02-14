import { put } from 'redux-saga/effects'

import {
  CaseSetListActionTypes,
  caseSetListDataActions,
} from './caseSetListActions'
import urlBuilder, { COMPONENTS } from '../util/urlBuilder'
import dataStateActionSagaWrapperLoadOnly from '../util/dataState/dataStateActionSagaWrapperLoadOnly'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* fetchCaseSetList() {
  try {
    const response = yield fetch(
      urlBuilder(COMPONENTS.EVALUATOR, 'list-case-sets'),
      {
        method: 'GET',
      },
    )

    if (!response.ok) {
      // todo: error handling
      throw new Error('Failed to fetch case set list.')
    }

    const data = yield response.json()

    yield put(caseSetListDataActions.store(data.existing_case_sets))
  } catch (error) {
    yield put(
      caseSetListDataActions.errored(
        `Failed to fetch case set list: ${error.message}`,
      ),
    )
  }
}

const caseSetsSagas = [
  dataStateActionSagaWrapperLoadOnly(
    CaseSetListActionTypes.CASE_SET_LIST_DATA,
    fetchCaseSetList,
  ),
]
export default caseSetsSagas
