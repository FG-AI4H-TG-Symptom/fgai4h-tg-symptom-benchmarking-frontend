import React, { ReactElement, ReactNode } from 'react'
import { CircularProgress } from '@material-ui/core'

import { DataState, Loadable } from './UtilTypes'

type DataStateManagerProps<T> = {
  data: Loadable<T>
  componentFunction: (data: T) => ReactNode
  loading?: boolean // this is only intended for loading states that aren't covered by the state of the data itself
}

function DataStateManager<T>({
  data,
  componentFunction,
  loading,
}: DataStateManagerProps<T>): ReactElement {
  if (data.state === DataState.LOADING || loading) {
    return <CircularProgress />
  }
  if (data.state === DataState.ERRORED) {
    return <b>ERROR: {data.error}</b>
  }
  if (data.state === DataState.INITIAL) {
    return <i>Uninitialized</i>
  }

  // casting necessary for TypeScript, for now https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544
  return componentFunction(data.data) as ReactElement
}

export default DataStateManager
