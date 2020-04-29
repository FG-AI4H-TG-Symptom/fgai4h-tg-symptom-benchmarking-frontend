import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../rootReducer'
import { DataState, InitialState, Loadable } from './dataStateTypes'
import { DataActionLoad } from './dataActionTypes'

const useDataStateLoader = <LoadableType>(
  selector: (state: RootState) => Loadable<LoadableType>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: DataActionLoad<any, any, any>,
  options: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadAfter?: Loadable<any>
  } = {},
): Loadable<LoadableType> => {
  const dispatch = useDispatch()
  const dependenciesSatisfied =
    !options.loadAfter || options.loadAfter.state === DataState.READY

  const loadedData =
    useSelector<RootState, Loadable<LoadableType>>(
      dependenciesSatisfied ? selector : (): null => null,
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
