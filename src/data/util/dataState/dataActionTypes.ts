/* eslint-disable import/prefer-default-export */
export enum DataActionTypes {
  RESET = 'RESET',
  LOAD = 'LOAD',
  STORE = 'STORE',
  ERROR = 'ERROR',
}

export type DataActionLoad<T, U> = {
  type: string
  payload: { intent: DataActionTypes.LOAD; parameters: U }
}
export type DataActionStore<T> = {
  type: string
  payload: { intent: DataActionTypes.STORE; data: T }
}
export type DataActionErrored<T> = {
  type: string
  payload: { intent: DataActionTypes.ERROR; error: string }
}
export type DataActionReset<T> = {
  type: string
  payload: { intent: DataActionTypes.RESET }
}
export type DataAction<T, U = void> =
  | DataActionLoad<T, U>
  | DataActionStore<T>
  | DataActionErrored<T>
  | DataActionReset<T>
