export enum DataState {
  INITIAL = 'INITIAL',
  LOADING = 'LOADING',
  READY = 'READY',
  ERRORED = 'ERRORED',
}
export type DataStateType = keyof typeof DataState

/**
 * State of a data entity: initial, no action has been performed yet
 */
export type DataInitial = { state: DataState.INITIAL }
/**
 * State of a data entity: currently processing, usually a network request,
 * can include loading of data as well as saving, updating, and deleting
 */
export type DataLoading = { state: DataState.LOADING }
/**
 * State of a data entity: ready, loading is completed and data can be accessed
 */
export type DataReady<DataType> = { state: DataState.READY; data: DataType }
/**
 * State of a data entity: errored, loading is completed but failed somehow; error message can be accessed
 */
export type DataErrored = { state: DataState.ERRORED; error: string }

/**
 * A data state with only three possible states, useful for concepts that never
 * return data such as deleting or placeholders
 */
export type LoadableCreateOnly = DataInitial | DataLoading | DataErrored
/**
 * Data state with all four different data states
 */
export type Loadable<DataType> = LoadableCreateOnly | DataReady<DataType>

export const InitialState: LoadableCreateOnly = { state: DataState.INITIAL }
export const LoadingState: LoadableCreateOnly = { state: DataState.LOADING }

export const ID_PLACEHOLDER_NEW = 'ID_PLACEHOLDER_NEW'
export type IdPlaceholderNew = typeof ID_PLACEHOLDER_NEW

/**
 * Generic store type, integrates with other data state generic utilities such
 * as reducers and selection hooks
 */
export type DataActionBaseState<DataType> = {
  [ID_PLACEHOLDER_NEW]: LoadableCreateOnly
  entries: {
    [id: string]: Loadable<DataType>
  }
  deletions: {
    [id: string]: Loadable<void>
  }
  saves: {
    [id: string]: Loadable<void>
  }
  overview: Loadable<DataType[]>
}

/**
 * Initial state factory for the generic store type
 */
export const dataActionBaseStateInitial = <
  DataType
>(): DataActionBaseState<DataType> => ({
  [ID_PLACEHOLDER_NEW]: InitialState,
  entries: {},
  deletions: {},
  saves: {},
  overview: InitialState,
})
