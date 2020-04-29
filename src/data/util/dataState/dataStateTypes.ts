export enum DataState {
  INITIAL = 'INITIAL',
  LOADING = 'LOADING',
  READY = 'READY',
  ERRORED = 'ERRORED',
}
export type DataStateType = keyof typeof DataState

export type DataReady<DataType> = { state: DataState.READY; data: DataType }

export type Loadable<DataType> = LoadableCreateOnly | DataReady<DataType>

export type LoadableCreateOnly =
  | { state: DataState.INITIAL }
  | { state: DataState.LOADING }
  | { state: DataState.ERRORED; error: string }

export const InitialState: LoadableCreateOnly = { state: DataState.INITIAL }
export const LoadingState: LoadableCreateOnly = { state: DataState.LOADING }
