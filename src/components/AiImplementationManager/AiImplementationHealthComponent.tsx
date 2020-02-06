import React from 'react'

import { CircularProgress } from '@material-ui/core'
import {
  Check as StatusGoodIcon,
  Clear as StatusBadIcon,
} from '@material-ui/icons'

import { AiImplementationHealth } from '../../data/aiImplementationList/aiImplementationDataType'
import { Loading } from '../util/UtilTypes'

const AiImplementationHealthComponent: React.FC<{
  health: Loading<{ status: AiImplementationHealth }>
}> = ({ health }) => {
  if (!health || health.loading === true) {
    return <CircularProgress />
  }

  return health.status === AiImplementationHealth.OK ? (
    <StatusGoodIcon />
  ) : (
    <StatusBadIcon />
  )
}

export default AiImplementationHealthComponent
