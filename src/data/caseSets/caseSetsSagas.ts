import { put } from 'redux-saga/effects'
import { caseSetDataAction, CaseSetsActionTypes } from './caseSetsActions'
import urlBuilder, { COMPONENTS } from '../util/urlBuilder'
import dataStateActionSagaWrapperLoadOnly from '../util/dataState/dataStateActionSagaWrapperLoadOnly'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* fetchCaseSet(caseSetId: string) {
  try {
    const response = yield fetch(
      urlBuilder(COMPONENTS.EVALUATOR, 'extract-case-set'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(caseSetId),
      },
    )

    if (!response.ok) {
      // todo: error handling
      throw new Error('Failed to fetch case set.')
    }

    const data = yield response.json()

    yield put(caseSetDataAction.store(data.cases, caseSetId))
  } catch (error) {
    yield put(caseSetDataAction.errored(error, caseSetId))
  }
}

const caseSetsSagas = [
  dataStateActionSagaWrapperLoadOnly(
    CaseSetsActionTypes.CASE_SET_DATA_ACTION,
    fetchCaseSet,
  ),
]
export default caseSetsSagas
