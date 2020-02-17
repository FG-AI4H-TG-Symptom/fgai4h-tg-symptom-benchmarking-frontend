import {
  DataActionErrored,
  DataActionLoad,
  DataActionReset,
  DataActionStore,
  DataActionTypes,
} from './dataActionTypes'

type DataStateActions<DataType, ParameterType = void, MetadataType = void> = {
  load: (
    parameters: ParameterType,
    metadata: MetadataType,
  ) => DataActionLoad<ParameterType, MetadataType>
  store: (
    data: DataType,
    metadata: MetadataType,
  ) => DataActionStore<DataType, MetadataType>
  errored: (
    error: string,
    metadata: MetadataType,
  ) => DataActionErrored<MetadataType>
  reset: (metadata: MetadataType) => DataActionReset<MetadataType>
}

const generateDataStateActions = <
  DataType,
  ParameterType = void,
  MetadataType = void
>(
  type: string,
): DataStateActions<DataType, ParameterType, MetadataType> => ({
  load: (
    parameters,
    metadata,
  ): DataActionLoad<ParameterType, MetadataType> => ({
    type,
    payload: { intent: DataActionTypes.LOAD, parameters, metadata },
  }),
  store: (data, metadata): DataActionStore<DataType, MetadataType> => ({
    type,
    payload: { intent: DataActionTypes.STORE, data, metadata },
  }),
  errored: (error, metadata): DataActionErrored<MetadataType> => ({
    type,
    payload: { intent: DataActionTypes.ERROR, error, metadata },
  }),
  reset: (metadata): DataActionReset<MetadataType> => ({
    type,
    payload: { intent: DataActionTypes.RESET, metadata },
  }),
})

export default generateDataStateActions
