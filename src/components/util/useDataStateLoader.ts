import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState, RootStateEntries } from "../../data/rootReducer";
import {
  DataActionBaseState,
  DataState,
  InitialState,
  Loadable
} from "../../data/util/dataState/dataStateTypes";
import { DataActionLoad } from "../../data/util/dataState/dataActionTypes";

/**
 * A hook to load data by triggering an action and selecting from the store
 * Only works for sub-stores that inherit from DataActionBaseState and best used with DataStateActions
 * @param selector either the name of the concept or a selector function (like `useSelector`)
 * @param action the load method of the data state entity
 * @param options object with an entry for another entry that needs to be loaded first and an entry for an id of the entity to be retrieved
 */
const useDataStateLoader = <LoadableType>(
  selector: RootStateEntries | ((state: RootState) => Loadable<LoadableType>),
  action: DataActionLoad<any, any, any>,
  options: {
    loadAfter?: Loadable<any>;
    getSingleEntryForId?: string;
  } = {}
): Loadable<LoadableType> => {
  const dispatch = useDispatch();

  const deletion = useSelector<RootState, Loadable<void>>(
    typeof selector === "string" && options.getSingleEntryForId
      ? (state: RootState): Loadable<void> =>
          (state[selector] as DataActionBaseState<LoadableType>).deletions[
            options.getSingleEntryForId
          ]
      : (): null => null
  );

  const dependenciesSatisfied =
    (!options.loadAfter || options.loadAfter.state === DataState.READY) &&
    (!deletion || deletion.state !== DataState.READY);

  let inferredSelector;
  if (typeof selector === "string") {
    if (options.getSingleEntryForId) {
      inferredSelector = (state: RootState): Loadable<LoadableType> =>
        (state[selector] as DataActionBaseState<LoadableType>).entries[
          options.getSingleEntryForId
        ];
    } else {
      inferredSelector = (state: RootState): Loadable<LoadableType[]> =>
        (state[selector] as DataActionBaseState<LoadableType>).overview;
    }
  } else {
    inferredSelector = selector;
  }

  const loadedData =
    useSelector<RootState, Loadable<LoadableType>>(
      dependenciesSatisfied ? inferredSelector : (): null => null
    ) || InitialState;

  useEffect(() => {
    if (!dependenciesSatisfied) {
      return;
    }
    if (loadedData.state === DataState.INITIAL) {
      dispatch(action);
    }
  }, [dependenciesSatisfied, action, loadedData.state, dispatch]);

  return loadedData;
};

export default useDataStateLoader;
