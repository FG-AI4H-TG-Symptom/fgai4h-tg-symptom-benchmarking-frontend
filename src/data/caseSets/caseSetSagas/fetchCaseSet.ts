import { put } from 'redux-saga/effects'

import urlBuilder from '../../util/urlBuilder'
import httpResponseErrorMessage from '../../util/httpResponseErrorMessage'
import { caseSetDataAction } from '../caseSetActions'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* fetchCaseSet(caseSetId: string) {
  try {
    const response: Response = yield fetch(
      urlBuilder(`case-sets/${caseSetId}?full=1`),
    )

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response))
    }

    const caseSet = yield response.json()

    yield put(caseSetDataAction.store(caseSet, { caseSetId }))
  } catch (error) {
    yield put(
      caseSetDataAction.errored(`Failed to fetch case set: ${error.message}`, {
        caseSetId,
      }),
    )
  }
}

export default fetchCaseSet
