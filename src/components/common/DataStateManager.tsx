import React, { ReactElement, ReactNode } from 'react'
import { CircularProgress } from '@material-ui/core'

import { DataState, Loadable } from '../../data/util/dataState/dataStateTypes'

import Error from './Error'

type DataStateManagerProps<DataType> = {
  data: Loadable<DataType>
  interstitial?: ReactElement
  loading?: boolean // this is only intended for loading states that aren't covered by the state of the data itself
} & (
  | {
      componentFunction: (data: DataType) => ReactNode
      allowUninitialized?: false
    }
  | {
      componentFunction: (data: DataType | undefined) => ReactNode
      allowUninitialized: true
    }
)

function DataStateManager<DataType>({
  data,
  componentFunction,
  loading,
  interstitial,
  allowUninitialized,
}: DataStateManagerProps<DataType>): ReactElement {
  if (data?.state === DataState.ERRORED) {
    // todo: allow more customizations of size / location / ...
    return <Error error={data.error} />
  }

  if (loading || !data || data.state === DataState.LOADING) {
    return interstitial || <CircularProgress />
  }

  if (data.state === DataState.INITIAL) {
    if (allowUninitialized === true) {
      return componentFunction(undefined) as ReactElement
    }

    return <i>Uninitialized</i>
  }

  // casting necessary for TypeScript, for now https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544
  return componentFunction(data.data) as ReactElement
}

export default DataStateManager
