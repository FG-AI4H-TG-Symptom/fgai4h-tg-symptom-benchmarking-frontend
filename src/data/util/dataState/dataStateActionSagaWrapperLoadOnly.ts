import { takeEvery } from 'redux-saga/effects'

import { DataActionTypes } from './dataActionTypes'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function dataStateActionSagaWrapperLoadOnly(
  dataActionType: string,
  generator,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function* sagaWrapper(action) {
    if (action.payload.intent !== DataActionTypes.LOAD) {
      return
    }

    yield* generator(action.payload.parameters)
  }

  return takeEvery(dataActionType, sagaWrapper)
}
