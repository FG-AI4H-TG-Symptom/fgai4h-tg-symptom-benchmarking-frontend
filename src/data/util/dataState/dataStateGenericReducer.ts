import dotProp from 'dot-prop-immutable'

import { DataAction, DataActionTypes } from './dataActionTypes'
import { DataState, LoadingState } from './dataStateTypes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const identity = <V>(x): V => (x as any) as V

const dataStateGenericReducer = <
  StateType,
  DataActionDataType,
  TransformedDataType = DataActionDataType,
  DataActionMetadataType = void
>(
  path:
    | ((
        action: DataAction<DataActionDataType, void, DataActionMetadataType>,
      ) => string)
    | string
    | null = null,
  dataTransform: (data: DataActionDataType) => TransformedDataType = identity,
) => (
  state: StateType,
  action: DataAction<DataActionDataType, void, DataActionMetadataType>,
): StateType => {
  let newValue
  if (action.payload.intent === DataActionTypes.LOAD) {
    newValue = LoadingState
  } else if (action.payload.intent === DataActionTypes.ERROR) {
    newValue = { state: DataState.ERRORED, error: action.payload.error }
  } else if (action.payload.intent === DataActionTypes.STORE) {
    newValue = {
      state: DataState.READY,
      data: dataTransform(action.payload.data),
    }
  } else {
    newValue = { state: DataState.INITIAL }
  }

  if (path !== null) {
    let evaluatedPath
    if (typeof path === 'function') {
      evaluatedPath = path(action)
    } else {
      evaluatedPath = path
    }
    return dotProp.set(state, evaluatedPath, newValue)
  }
  return newValue
}

export default dataStateGenericReducer
