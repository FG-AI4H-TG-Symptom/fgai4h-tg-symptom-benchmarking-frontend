import React from 'react'

import { aiImplementationListDataActions } from '../../data/aiImplementationList/aiImplementationListActions'
import { AiImplementationInfo } from '../../data/aiImplementationList/aiImplementationDataType'
import useDataStateLoader from '../../data/util/dataState/useDataStateLoader'
import DataStateManager from '../common/DataStateManager'
import BasicPageLayout from '../common/BasicPageLayout'

import AiImplementationManagerComponent from './AiImplementationManagerComponent'

const AiImplementationManagerContainer: React.FC<{}> = () => {
  const aiImplementationList = useDataStateLoader<{
    [id: string]: AiImplementationInfo
  }>(
    state => state.aiImplementationList,
    aiImplementationListDataActions.load({
      withHealth: false,
    }),
  )

  return (
    <BasicPageLayout title='AI implementations'>
      <DataStateManager
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
