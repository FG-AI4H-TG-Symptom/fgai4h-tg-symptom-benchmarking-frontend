import {
  DataActionErrored,
  DataActionLoad,
  DataActionReset,
  DataActionStore,
  DataActionTypes,
  TypeUnionIgnoreVoid,
} from './dataActionTypes'

// todo: enforce that all `CallbackType`s extend `CallbackMetadata`
export type CallbackMetadata<DataType> = {
  onSuccess?: (data: DataType) => void
}

// the awkward ternaries are blocked on https://github.com/microsoft/TypeScript/issues/29131
/**
 * type definition for the four-in-one action creator accompanying the Loadable type
 */
type DataStateActions<
  DataType,
  ParameterType = void,
  MetadataType = void,
  CallbackType = void
> = {
  /**
   * Create an action to 'load' data, can also be a save/update/delete action
   * Precise arguments (0-2) depend on the types passed in
   * @param parameters <ParameterType> Parameters for the load call, such as an ID or the data to be stored
   * @param metadata <MetadataType & CallbackType> Metadata for storing the result (such as an ID) and callbacks (currently on `onSuccess`)
   */
  load: (
    ...params: TypeUnionIgnoreVoid<MetadataType, CallbackType> extends void
      ? ParameterType extends void
        ? []
        : Parameters<(parameters: ParameterType) => void>
      : Parameters<
          (
            parameters: ParameterType,
            metadata: TypeUnionIgnoreVoid<MetadataType, CallbackType>,
          ) => void
        >
  ) => DataActionLoad<ParameterType, MetadataType, CallbackType>
  /**
   * Create an action to 'store' data
   * Precise arguments (1-2) depend on the types passed in
   * @param data <DataType> The data/response that was fetched
   * @param metadata <MetadataType & CallbackType> Metadata for storing the result (such as an ID) and callbacks (currently on `onSuccess`)
   */
  store: (
    ...params: TypeUnionIgnoreVoid<MetadataType, CallbackType> extends void
      ? Parameters<(data: DataType) => void>
      : Parameters<
          (
            data: DataType,
            metadata: TypeUnionIgnoreVoid<MetadataType, CallbackType>,
          ) => void
        >
  ) => DataActionStore<DataType, MetadataType, CallbackType>
  /**
   * Create an action to indicate an 'error' when performing the request
   * @param error Human readable error message
   * @param metadata <MetadataType> Metadata for storing the error (such as an ID)
   */
  errored: (
    error: string,
    ...params: MetadataType extends void
      ? []
      : Parameters<(metadata: MetadataType) => void>
  ) => DataActionErrored<MetadataType>
  /**
   * Create an action to 'reset' the data to its pristine state (no data, not loading, not errored)
   * @param metadata Metadata for data to reset (such as an ID)
   */
  reset: (
    ...params: MetadataType extends void
      ? []
      : Parameters<(metadata: MetadataType) => void>
  ) => DataActionReset<MetadataType>
}

/**
 * Factory for a four-in-one action creator as described by DataStateActions
 * Created actions all have the same `type` and are distinguished by differing `payload.intent` values (DataActionTypes)
 * @param type Redux action type constant
 */
const generateDataStateActions = <
  DataType,
  ParameterType = void,
  MetadataType = void,
  CallbackType = void
>(
  type: string,
): DataStateActions<DataType, ParameterType, MetadataType, CallbackType> => ({
  load: (
    parameters?,
    metadata?,
  ): DataActionLoad<ParameterType, MetadataType, CallbackType> => {
    return {
      type,
      payload: { intent: DataActionTypes.LOAD, parameters },
      meta: metadata,
    }
  },
  store: (
    data,
    metadata?,
  ): DataActionStore<DataType, MetadataType, CallbackType> => ({
    type,
    payload: { intent: DataActionTypes.STORE, data },
    meta: metadata,
  }),
  errored: (error, metadata?): DataActionErrored<MetadataType> => ({
    type,
    payload: { intent: DataActionTypes.ERROR, error },
    meta: metadata,
  }),
  reset: (metadata?): DataActionReset<MetadataType> => ({
    type,
    payload: { intent: DataActionTypes.RESET },
    meta: metadata,
  }),
})

export default generateDataStateActions
