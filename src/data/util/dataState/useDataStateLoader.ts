import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../rootReducer'
import {
  DataActionBaseState,
  DataState,
  InitialState,
  Loadable,
} from './dataStateTypes'
import { DataActionLoad } from './dataActionTypes'

// todo: document
const useDataStateLoader = <LoadableType>(
  selector: string | ((state: RootState) => Loadable<LoadableType>),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: DataActionLoad<any, any, any>,
  options: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadAfter?: Loadable<any>
    getSingleEntryForId?: string
  } = {},
): Loadable<LoadableType> => {
  const dispatch = useDispatch()

  const deletion = useSelector<RootState, Loadable<void>>(
    typeof selector === 'string' && options.getSingleEntryForId
      ? (state: RootState): Loadable<void> =>
          (state[selector] as DataActionBaseState<LoadableType>).deletions[
            options.getSingleEntryForId
          ]
      : (): null => null,
  )

  const dependenciesSatisfied =
    (!options.loadAfter || options.loadAfter.state === DataState.READY) &&
    (!deletion || deletion.state !== DataState.READY)

  let inferredSelector
  if (typeof selector === 'string') {
    if (options.getSingleEntryForId) {
      inferredSelector = (state: RootState): Loadable<LoadableType> =>
        (state[selector] as DataActionBaseState<LoadableType>).entries[
          options.getSingleEntryForId
        ]
    } else {
      inferredSelector = (state: RootState): Loadable<LoadableType[]> =>
        (state[selector] as DataActionBaseState<LoadableType>).overview
    }
  } else {
    inferredSelector = selector
  }

  const loadedData =
    useSelector<RootState, Loadable<LoadableType>>(
      dependenciesSatisfied ? inferredSelector : (): null => null,
    ) || InitialState

  useEffect(() => {
    if (!dependenciesSatisfied) {
      return
    }
    if (loadedData.state === DataState.INITIAL) {
      dispatch(action)
    }
  }, [dependenciesSatisfied, action, loadedData.state, dispatch])

  return loadedData
}

export default useDataStateLoader
