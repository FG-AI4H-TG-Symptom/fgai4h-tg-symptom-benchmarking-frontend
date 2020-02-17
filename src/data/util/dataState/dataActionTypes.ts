/* eslint-disable import/prefer-default-export */
export enum DataActionTypes {
  RESET = 'RESET',
  LOAD = 'LOAD',
  STORE = 'STORE',
  ERROR = 'ERROR',
}

export type DataActionLoad<ParameterType, MetadataType> = {
  type: string
  payload: {
    intent: DataActionTypes.LOAD
    parameters: ParameterType
    metadata: MetadataType
  }
}
export type DataActionStore<DataType, MetadataType> = {
  type: string
  payload: {
    intent: DataActionTypes.STORE
    data: DataType
    metadata: MetadataType
  }
}
export type DataActionErrored<MetadataType> = {
  type: string
  payload: {
    intent: DataActionTypes.ERROR
    error: string
    metadata: MetadataType
  }
}
export type DataActionReset<MetadataType> = {
  type: string
  payload: { intent: DataActionTypes.RESET; metadata: MetadataType }
}
export type DataAction<
  DataType,
  LoadParametersType = void,
  MetadataType = void
> =
  | DataActionLoad<LoadParametersType, MetadataType>
  | DataActionStore<DataType, MetadataType>
  | DataActionErrored<MetadataType>
  | DataActionReset<MetadataType>
