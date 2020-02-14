import dotProp from 'dot-prop-immutable'

import { DataAction, DataActionTypes } from './dataActionTypes'
import { DataState, LoadingState } from './dataStateTypes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const identity = <V>(x): V => (x as any) as V

const dataStateGenericReducer = <T, U, V = U>(
  path: string | null = null,
  dataTransform: (data: U) => V = identity,
) => (state: T, action: DataAction<U>): T => {
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
    return dotProp.set(state, path, newValue)
  }
  return newValue
}

export default dataStateGenericReducer
