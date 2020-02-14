import { DataAction, DataActionTypes } from './dataActionTypes'
import { DataState, Loadable, LoadingState } from './dataStateTypes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const identity = <V>(x): V => (x as any) as V

const dataStateGenericReducer = <T, U, V = U>(
  dataTransform: (data: U) => V = identity,
) => (state: T, action: DataAction<U>): Loadable<V> => {
  if (action.payload.intent === DataActionTypes.LOAD) {
    return LoadingState
  }
  if (action.payload.intent === DataActionTypes.ERROR) {
    return { state: DataState.ERRORED, error: action.payload.error }
  }
  if (action.payload.intent === DataActionTypes.STORE) {
    return { state: DataState.READY, data: dataTransform(action.payload.data) }
  }

  return { state: DataState.INITIAL }
}

export default dataStateGenericReducer
