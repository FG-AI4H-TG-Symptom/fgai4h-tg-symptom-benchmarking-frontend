import React from 'react'
import { useDispatch } from 'react-redux'

import {
  aiImplementationDeleteDataAction,
  aiImplementationOverviewDataAction,
} from '../../../data/aiImplementations/aiImplementationsActions'
import { AiImplementationInfo } from '../../../data/aiImplementations/aiImplementationDataType'
import useDataStateLoader from '../../util/useDataStateLoader'
import DataStateManager from '../../common/DataStateManager'
import BasicPageLayout from '../../common/BasicPageLayout'

import AiImplementationManagerComponent from './AiImplementationManagerComponent'

const AiImplementationManagerContainer: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const aiImplementationList = useDataStateLoader<AiImplementationInfo[]>(
    'aiImplementations',
    aiImplementationOverviewDataAction.load({
      withHealth: false,
    }),
  )
  const deleteAiImplementation = (aiImplementationId: string): void => {
    dispatch(
      aiImplementationDeleteDataAction.load(aiImplementationId, {
        aiImplementationId,
      }),
    )
  }

  return (
    <BasicPageLayout title='AI implementations'>
      <DataStateManager<AiImplementationInfo[]>
        data={aiImplementationList}
        componentFunction={(aiImplementationListData): JSX.Element => (
          <AiImplementationManagerComponent
            aiImplementations={aiImplementationListData}
            deleteAiImplementation={deleteAiImplementation}
          />
        )}
      />
    </BasicPageLayout>
  )
}

export default AiImplementationManagerContainer
