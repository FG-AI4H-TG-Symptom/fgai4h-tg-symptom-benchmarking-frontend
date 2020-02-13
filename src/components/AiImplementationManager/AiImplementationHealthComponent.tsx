import React from 'react'

import {
  Check as StatusGoodIcon,
  Clear as StatusBadIcon,
} from '@material-ui/icons'

import { AiImplementationHealth } from '../../data/aiImplementationList/aiImplementationDataType'
import { Loadable } from '../util/UtilTypes'
import DataStateManager from '../util/DataStateManager'

const AiImplementationHealthComponent: React.FC<{
  health: Loadable<AiImplementationHealth>
}> = ({ health }) => (
  <DataStateManager
    loading={!health}
    data={health}
    componentFunction={(healthData): JSX.Element =>
      healthData === AiImplementationHealth.OK ? (
        <StatusGoodIcon />
      ) : (
        <StatusBadIcon />
      )
    }
  />
)

export default AiImplementationHealthComponent
