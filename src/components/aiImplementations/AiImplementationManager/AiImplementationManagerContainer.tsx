import React from 'react'

import { aiImplementationListDataActions } from '../../../data/aiImplementations/aiImplementationListActions'
import { AiImplementationInfo } from '../../../data/aiImplementations/aiImplementationDataType'
import useDataStateLoader from '../../util/useDataStateLoader'
import DataStateManager from '../../common/DataStateManager'
import BasicPageLayout from '../../common/BasicPageLayout'

import AiImplementationManagerComponent from './AiImplementationManagerComponent'

const AiImplementationManagerContainer: React.FC<{}> = () => {
  const aiImplementationList = useDataStateLoader<AiImplementationInfo[]>(
    'aiImplementations',
    aiImplementationListDataActions.load({
      withHealth: false,
    }),
  )

  return (
    <BasicPageLayout title='AI implementations'>
      <DataStateManager<AiImplementationInfo[]>
        data={aiImplementationList}
        componentFunction={(aiImplementationListData): JSX.Element => (
          <AiImplementationManagerComponent
            aiImplementations={aiImplementationListData}
          />
        )}
      />
    </BasicPageLayout>
  )
}

export default AiImplementationManagerContainer
