import dotProp from 'dot-prop-immutable'

import { DataAction, DataActionStore, DataActionTypes } from './dataActionTypes'
import {
  DataActionBaseState,
  DataState,
  ID_PLACEHOLDER_NEW,
  LoadingState,
} from './dataStateTypes'
import { CallbackMetadata } from './generateDataStateActions'
import { BaseConcept } from '../baseConceptTypes'

export const createOptions = <
  DataType extends BaseConcept,
  StateType extends DataActionBaseState<DataType>,
  MetadataType = CallbackMetadata<DataType>
>(): DataStateGenericReducerOptions<
  StateType,
  DataType,
  DataType,
  MetadataType
> => ({
  path: (action): string =>
    action.payload.intent === DataActionTypes.STORE
      ? `entries.${action.payload.data.id}`
      : ID_PLACEHOLDER_NEW,
  postflightTransform: (state, action): StateType => {
    if (action.payload.intent !== DataActionTypes.STORE) {
      return state
    }

    return dotProp.delete(state, ID_PLACEHOLDER_NEW) as StateType
  },
})

type SaveOptionsOverride<DataType, StateType, MetadataType> = {
  updateEntry?: (
    state: StateType,
    action: DataActionStore<DataType, MetadataType, void>,
  ) => StateType
  updateOverview?: (
    state: StateType,
    action: DataActionStore<DataType, MetadataType, void>,
  ) => StateType
}

export const saveOptions = <
  DataType extends BaseConcept,
  StateType extends DataActionBaseState<DataType>,
  MetadataType,
  ActionDataType extends BaseConcept = DataType
>(
  metadataIdFieldName: string,
  options?: SaveOptionsOverride<ActionDataType, StateType, MetadataType>,
): DataStateGenericReducerOptions<
  StateType,
  ActionDataType,
  void,
  MetadataType & CallbackMetadata<ActionDataType>
> => ({
  path: (action): string => `saves.${action.meta[metadataIdFieldName]}`,
  postflightTransform: (state: StateType, action): StateType => {
    if (action.payload.intent !== DataActionTypes.STORE) {
      return state
    }

    let nextState = state
    if (nextState.overview.state === DataState.READY) {
      if (options?.updateOverview) {
        nextState = options.updateOverview(
          nextState,
          action as DataActionStore<ActionDataType, MetadataType, void>,
        )
      } else {
        nextState = dotProp.set(
          nextState,
          `overview.data.${nextState.overview.data.findIndex(
            ({ id }) => id === action.meta[metadataIdFieldName],
          )}`,
          action.payload.data,
        ) as StateType
      }
    }

    if (options?.updateEntry) {
      nextState = options.updateEntry(
        nextState,
        action as DataActionStore<ActionDataType, MetadataType, void>,
      )
    } else {
      nextState = dotProp.set(
        nextState,
        `entries.${action.meta[metadataIdFieldName]}`,
        action.payload.data,
      ) as StateType
    }

    return dotProp.delete(
      nextState,
      `saves.${action.meta[metadataIdFieldName]}`,
    ) as StateType
  },
})

export const deleteOptions = <
  DataType extends BaseConcept,
  StateType extends DataActionBaseState<DataType>
>(
  metadataIdFieldName: string,
): DataStateGenericReducerOptions<
  StateType,
  void,
  void,
  CallbackMetadata<void>
> => ({
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

export type DataStateGenericReducerOptions<
  StateType,
  DataActionDataType,
  TransformedDataType,
  DataActionMetadataType
> = {
  path?:
    | ((
        action: DataAction<DataActionDataType, void, DataActionMetadataType>,
        state: StateType,
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
}
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
}: DataStateGenericReducerOptions<
  StateType,
  DataActionDataType,
  TransformedDataType,
  DataActionMetadataType
> = {}) => (
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
        evaluatedPath = path(action, state)
      } else {
        evaluatedPath = path
      }
      return dotProp.set(state, evaluatedPath, newValue)
    }
    return newValue
  })()

  return postflightTransform(nextState, action)
}

// no return type as it's a thin wrapper and TypeScript inference works just fine
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const dataStateSaveReducer = <
  DataType extends BaseConcept,
  StateType extends DataActionBaseState<DataType>,
  MetadataType,
  ActionDataType extends BaseConcept = DataType
>(
  metadataIdFieldName: string,
  options?: SaveOptionsOverride<ActionDataType, StateType, MetadataType>,
) =>
  dataStateGenericReducer<
    StateType,
    ActionDataType,
    void,
    MetadataType & CallbackMetadata<ActionDataType>
  >(
    saveOptions<DataType, StateType, MetadataType, ActionDataType>(
      metadataIdFieldName,
      options,
    ),
  )

export default dataStateGenericReducer
