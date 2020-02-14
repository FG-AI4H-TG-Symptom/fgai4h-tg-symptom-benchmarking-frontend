import {
  DataActionErrored,
  DataActionLoad,
  DataActionReset,
  DataActionStore,
  DataActionTypes,
} from './dataActionTypes'

type DataStateActions<T, U> = {
  load: (parameters: U) => DataActionLoad<T, U>
  store: (data: T) => DataActionStore<T>
  errored: (error: string) => DataActionErrored<T>
  reset: () => DataActionReset<T>
}

const generateDataStateActions = <T, U = void>(
  type: string,
): DataStateActions<T, U> => ({
  load: (parameters): DataActionLoad<T, U> => ({
    type,
    payload: { intent: DataActionTypes.LOAD, parameters },
  }),
  store: (data: T): DataActionStore<T> => ({
    type,
    payload: { intent: DataActionTypes.STORE, data },
  }),
  errored: (error: string): DataActionErrored<T> => ({
    type,
    payload: { intent: DataActionTypes.ERROR, error },
  }),
  reset: (): DataActionReset<T> => ({
    type,
    payload: { intent: DataActionTypes.RESET },
  }),
})

export default generateDataStateActions
