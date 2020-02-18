import {
  DataActionErrored,
  DataActionLoad,
  DataActionReset,
  DataActionStore,
  DataActionTypes,
} from './dataActionTypes'

// the awkward ternaries are blocked on https://github.com/microsoft/TypeScript/issues/29131
type DataStateActions<DataType, ParameterType = void, MetadataType = void> = {
  load: (
    ...params: MetadataType extends void
      ? ParameterType extends void
        ? []
        : Parameters<(parameters: ParameterType) => void>
      : Parameters<(parameters: ParameterType, metadata: MetadataType) => void>
  ) => DataActionLoad<ParameterType, MetadataType>
  store: (
    ...params: MetadataType extends void
      ? Parameters<(data: DataType) => void>
      : Parameters<(data: DataType, metadata: MetadataType) => void>
  ) => DataActionStore<DataType, MetadataType>
  errored: (
    ...params: MetadataType extends void
      ? Parameters<(error: string) => void>
      : Parameters<(error: string, metadata: MetadataType) => void>
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
  MetadataType = void
>(
  type: string,
): DataStateActions<DataType, ParameterType, MetadataType> => ({
  load: (
    parameters?,
    metadata?,
  ): DataActionLoad<ParameterType, MetadataType> => ({
    type,
    payload: { intent: DataActionTypes.LOAD, parameters, metadata },
  }),
  store: (data, metadata?): DataActionStore<DataType, MetadataType> => ({
    type,
    payload: { intent: DataActionTypes.STORE, data, metadata },
  }),
  errored: (error, metadata?): DataActionErrored<MetadataType> => ({
    type,
    payload: { intent: DataActionTypes.ERROR, error, metadata },
  }),
  reset: (metadata?): DataActionReset<MetadataType> => ({
    type,
    payload: { intent: DataActionTypes.RESET, metadata },
  }),
})

export default generateDataStateActions
