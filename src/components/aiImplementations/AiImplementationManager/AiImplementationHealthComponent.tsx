import React from 'react'

import {
  Check as StatusGoodIcon,
  Clear as StatusBadIcon,
} from '@material-ui/icons'

import { AiImplementationHealth } from '../../../data/aiImplementations/aiImplementationDataType'
import { Loadable } from '../../../data/util/dataState/dataStateTypes'
import DataStateManager from '../../common/DataStateManager'

const AiImplementationHealthComponent: React.FC<{
  health: Loadable<AiImplementationHealth>
}> = ({ health }) => (
  <DataStateManager<AiImplementationHealth>
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
