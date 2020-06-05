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
type DataStateActions<
  DataType,
  ParameterType = void,
  MetadataType = void,
  CallbackType = void
> = {
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
  errored: (
    error: string,
    ...params: MetadataType extends void
      ? []
      : Parameters<(metadata: MetadataType) => void>
  ) => DataActionErrored<MetadataType>
  reset: (
    ...params: MetadataType extends void
      ? []
      : Parameters<(metadata: MetadataType) => void>
  ) => DataActionReset<MetadataType>
}

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
