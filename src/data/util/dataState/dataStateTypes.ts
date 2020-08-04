export enum DataState {
  INITIAL = "INITIAL",
  LOADING = "LOADING",
  READY = "READY",
  ERRORED = "ERRORED",
}
export type DataStateType = keyof typeof DataState;

/**
 * State of a data entity: initial, no action has been performed yet
 */
export type DataInitial = { state: DataState.INITIAL };
/**
 * State of a data entity: currently processing, usually a network request,
 * can include loading of data as well as saving, updating, and deleting
 */
export type DataLoading = { state: DataState.LOADING };
/**
 * State of a data entity: ready, loading is completed and data can be accessed
 */
export type DataReady<DataType> = { state: DataState.READY; data: DataType };
/**
 * State of a data entity: errored, loading is completed but failed somehow; error message can be accessed
 */
export type DataErrored = { state: DataState.ERRORED; error: string };

/**
 * A data state with only three possible states, useful for concepts that never
 * return data such as deleting or placeholders
 */
export type LoadableCreateOnly = DataInitial | DataLoading | DataErrored;
/**
 * Data state with all four different data states
 */
export type Loadable<DataType> = LoadableCreateOnly | DataReady<DataType>;
