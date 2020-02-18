import { put } from 'redux-saga/effects'

import {
  CaseSetActionTypes,
  caseSetDataAction,
  caseSetListDataActions,
  createCaseSetDataActions,
  CreateCaseSetParameters,
} from './caseSetActions'
import urlBuilder, { COMPONENTS } from '../util/urlBuilder'
import dataStateActionSagaWrapperLoadOnly from '../util/dataState/dataStateActionSagaWrapperLoadOnly'
import httpResponseErrorMessage from '../util/httpResponseErrorMessage'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* fetchCaseSetList() {
  try {
    const response: Response = yield fetch(
      urlBuilder(COMPONENTS.EVALUATOR, 'list-case-sets'),
      {
        method: 'GET',
      },
    )

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response))
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* fetchCaseSet(caseSetId: string) {
  try {
    const response: Response = yield fetch(
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
      throw new Error(httpResponseErrorMessage(response))
    }

    const data = yield response.json()

    yield put(caseSetDataAction.store(data.cases, caseSetId))
  } catch (error) {
    yield put(
      caseSetDataAction.errored(
        `Failed to fetch case set: ${error.message}`,
        caseSetId,
      ),
    )
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* createCaseSet({ numberOfCases }: CreateCaseSetParameters) {
  try {
    const response: Response = yield fetch(
      urlBuilder(COMPONENTS.EVALUATOR, 'generate-case-set'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numCases: numberOfCases }),
      },
    )

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response))
    }

    const data = yield response.json()

    yield put(createCaseSetDataActions.store(data.case_set_id))
  } catch (error) {
    yield put(
      createCaseSetDataActions.errored(
        `Failed to create case set: ${error.message}`,
      ),
    )
  }
}

const caseSetsSagas = [
  dataStateActionSagaWrapperLoadOnly(
    CaseSetActionTypes.CASE_SET_LIST_DATA_ACTION,
    fetchCaseSetList,
  ),
  dataStateActionSagaWrapperLoadOnly(
    CaseSetActionTypes.CASE_SET_DATA_ACTION,
    fetchCaseSet,
  ),
  dataStateActionSagaWrapperLoadOnly(
    CaseSetActionTypes.CREATE_CASE_SET_DATA_ACTION,
    createCaseSet,
  ),
]
export default caseSetsSagas
