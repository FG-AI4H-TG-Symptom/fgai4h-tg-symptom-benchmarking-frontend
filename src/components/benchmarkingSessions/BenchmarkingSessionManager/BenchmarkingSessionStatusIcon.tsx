import React from 'react'
import { Tooltip } from '@material-ui/core'
import {
  Check as FinishedIcon,
  LinearScale as CreatedIcon,
  PlayArrow as RunningIcon,
} from '@material-ui/icons'

import { BenchmarkingSessionStatus } from '../../../data/benchmarks/benchmarkManagerDataType'

const BenchmarkingSessionStatusIcon: React.FC<{
  status: BenchmarkingSessionStatus
}> = ({ status }) => {
  if (status === BenchmarkingSessionStatus.CREATED) {
    return (
      <Tooltip title='Created'>
        <CreatedIcon />
      </Tooltip>
    )
  }

  if (status === BenchmarkingSessionStatus.FINISHED) {
    return (
      <Tooltip title='Finished'>
        <FinishedIcon />
      </Tooltip>
    )
  }

  return (
    <Tooltip title='Currently running'>
      <RunningIcon />
    </Tooltip>
  )
}

export default BenchmarkingSessionStatusIcon
