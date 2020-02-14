import React, { ReactElement, ReactNode } from 'react'
import { CircularProgress } from '@material-ui/core'

import { DataState, Loadable } from '../../data/util/dataState/dataStateTypes'

import Error from './Error'

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
  if (loading || data.state === DataState.LOADING) {
    return <CircularProgress />
  }
  if (data.state === DataState.ERRORED) {
    // todo: allow more customizations of size / location / ...
    return <Error error={data.error} />
  }
  if (data.state === DataState.INITIAL) {
    return <i>Uninitialized</i>
  }

  // casting necessary for TypeScript, for now https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544
  return componentFunction(data.data) as ReactElement
}

export default DataStateManager
