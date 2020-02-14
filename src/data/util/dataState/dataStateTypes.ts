export enum DataState {
  INITIAL = 'INITIAL',
  LOADING = 'LOADING',
  READY = 'READY',
  ERRORED = 'ERRORED',
}
export type DataStateType = keyof typeof DataState
export type Loadable<T> =
  | { state: DataState.INITIAL }
  | { state: DataState.LOADING }
  | { state: DataState.ERRORED; error: string }
  | { state: DataState.READY; data: T }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const InitialState: Loadable<any> = { state: DataState.INITIAL }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LoadingState: Loadable<any> = { state: DataState.LOADING }
