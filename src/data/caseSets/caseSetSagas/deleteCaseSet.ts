import { put } from 'redux-saga/effects'

import urlBuilder from '../../util/urlBuilder'
import httpResponseErrorMessage from '../../util/httpResponseErrorMessage'
import { setFatalError } from '../../application/applicationActions'
import { caseSetDeleteDataAction } from '../caseSetActions'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function* deleteCaseSet(caseSetId, metadata) {
  try {
    const response = yield fetch(urlBuilder(`case-sets/${caseSetId}`), {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response))
    }

    yield put(caseSetDeleteDataAction.store(undefined, metadata))
  } catch (error) {
    console.error(error)
    yield put(
      setFatalError(`Errored while deleting case set: ${error.message}`),
    )
  }
}
