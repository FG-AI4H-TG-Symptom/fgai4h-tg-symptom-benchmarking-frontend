import { takeEvery } from 'redux-saga/effects'

import { DataActionTypes } from './dataActionTypes'

/**
 * A wrapper and saga-mounter for data state actions
 * Internally acts like `takeEvery` but only considers loading actions
 * @param dataActionType Redux type constant of the data action
 * @param saga The saga to call
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function dataStateActionSagaWrapperLoadOnly(
  dataActionType: string,
  saga,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function* sagaWrapper(action) {
    if (action.payload.intent !== DataActionTypes.LOAD) {
      return
    }

    yield* saga(action.payload.parameters, action.meta)
  }

  return takeEvery(dataActionType, sagaWrapper)
}
