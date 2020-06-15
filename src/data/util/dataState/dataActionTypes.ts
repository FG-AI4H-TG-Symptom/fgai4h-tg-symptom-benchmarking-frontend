/* eslint-disable import/prefer-default-export */

/**
 * The four possible types to distinguish `DataAction`s
 */
export enum DataActionTypes {
  RESET = 'RESET',
  LOAD = 'LOAD',
  STORE = 'STORE',
  ERROR = 'ERROR',
}

/**
 * A type union which ignores void types such that `T & void = T`
 */
export type TypeUnionIgnoreVoid<T, U> = T extends void
  ? U
  : U extends void
  ? T
  : T & U

export type DataActionLoad<ParameterType, MetadataType, CallbackType> = {
  type: string
  payload: {
    intent: DataActionTypes.LOAD
    parameters: ParameterType
  }
  meta: TypeUnionIgnoreVoid<MetadataType, CallbackType>
}
export type DataActionStore<DataType, MetadataType, CallbackType> = {
  type: string
  payload: {
    intent: DataActionTypes.STORE
    data: DataType
  }
  meta: TypeUnionIgnoreVoid<MetadataType, CallbackType>
}
export type DataActionErrored<MetadataType> = {
  type: string
  payload: {
    intent: DataActionTypes.ERROR
    error: string
  }
  meta: MetadataType
}
export type DataActionReset<MetadataType> = {
  type: string
  payload: { intent: DataActionTypes.RESET }
  meta: MetadataType
}
export type DataAction<
  DataType,
  LoadParametersType = void,
  MetadataType = void,
  CallbackType = void
> =
  | DataActionLoad<LoadParametersType, MetadataType, CallbackType>
  | DataActionStore<DataType, MetadataType, CallbackType>
  | DataActionErrored<MetadataType>
  | DataActionReset<MetadataType>
