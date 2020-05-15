import dotProp from 'dot-prop-immutable'

import { DataAction, DataActionTypes } from './dataActionTypes'
import { DataActionBaseState, DataState, LoadingState } from './dataStateTypes'
import { CallbackMetadata } from './generateDataStateActions'
import BaseConcept from '../baseConcept'

export const deleteOptions = <
  DataType extends BaseConcept,
  StateType extends DataActionBaseState<DataType>
>(
  metadataIdFieldName: string,
) => ({
  path: (action): string => `deletions.${action.meta[metadataIdFieldName]}`,
  postflightTransform: (state: StateType, action): StateType => {
    if (action.payload.intent !== DataActionTypes.STORE) {
      return state
    }

    let nextState = state
    if (nextState.overview.state === DataState.READY) {
      nextState = dotProp.delete(
        nextState,
        `overview.data.${nextState.overview.data.findIndex(
          ({ id }) => id === action.meta[metadataIdFieldName],
        )}`,
      ) as StateType
    }
    if (nextState.entries[action.meta[metadataIdFieldName]]) {
      nextState = dotProp.delete(
        nextState,
        `entries.${action.meta[metadataIdFieldName]}`,
      ) as StateType
    }

    return nextState
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const identity = <V>(x): V => (x as any) as V

/**
 * Generic reducer for DataStateActions
 * @param path A function (returning a string) or string indicating where in the state to store the data. Omit (or empty string) for root. [Default: Root]
 * @param dataTransform A function to transform the incoming data before saving in the store [Default: Identity]
 * @param preflightCheck A function to test whether to store the data (returned true) or not (returned false) [Default: No preflight]
 * @param postflightTransform A function that transforms the state after the reducer ran, if it ran [Default: Identity]
 */
const dataStateGenericReducer = <
  StateType,
  DataActionDataType,
  TransformedDataType = DataActionDataType,
  DataActionMetadataType = void
>({
  path,
  dataTransform = identity,
  preflightCheck,
  postflightTransform = (state): StateType => state,
}: {
  path?:
    | ((
        action: DataAction<DataActionDataType, void, DataActionMetadataType>,
      ) => string)
    | string
    | null
  dataTransform?: (data: DataActionDataType) => TransformedDataType
  preflightCheck?: (
    state: StateType,
    action: DataAction<DataActionDataType, void, DataActionMetadataType>,
  ) => boolean
  postflightTransform?: (
    state: StateType,
    action: DataAction<DataActionDataType, void, DataActionMetadataType>,
  ) => StateType
} = {}) => (
  state: StateType,
  action: DataAction<DataActionDataType, void, DataActionMetadataType>,
): StateType => {
  if (preflightCheck) {
    if (!preflightCheck(state, action)) {
      return state
    }
  }

  const nextState = ((): StateType => {
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
      if (action.meta && 'onSuccess' in action.meta) {
        const { data } = action.payload
        setTimeout(() => {
          ;(action.meta as CallbackMetadata<DataActionDataType>).onSuccess(data)
        }, 0)
      }
    } else {
      newValue = { state: DataState.INITIAL }
    }

    if (path) {
      let evaluatedPath
      if (typeof path === 'function') {
        evaluatedPath = path(action)
      } else {
        evaluatedPath = path
      }
      return dotProp.set(state, evaluatedPath, newValue)
    }
    return newValue
  })()

  return postflightTransform(nextState, action)
}

export default dataStateGenericReducer
