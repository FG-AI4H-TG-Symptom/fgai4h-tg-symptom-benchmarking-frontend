import React from 'react'
import { useDispatch } from 'react-redux'
import { IconButton, Tooltip } from '@material-ui/core'
import { Add as CreateIcon } from '@material-ui/icons'

import { paths } from '../../../routes'
import {
  aiImplementationDeleteDataAction,
  aiImplementationOverviewDataAction,
} from '../../../data/aiImplementations/aiImplementationsActions'
import { AiImplementationInfo } from '../../../data/aiImplementations/aiImplementationDataType'
import useDataStateLoader from '../../util/useDataStateLoader'
import DataStateManager from '../../common/DataStateManager'
import BasicPageLayout from '../../common/BasicPageLayout'
import LinkWrapper from '../../common/LinkWrapper'

import AiImplementationManagerComponent from './AiImplementationManagerComponent'

const AiImplementationManagerContainer: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const aiImplementationList = useDataStateLoader<AiImplementationInfo[]>(
    'aiImplementations',
    aiImplementationOverviewDataAction.load({
      withHealth: true,
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
    <BasicPageLayout
      title='AI implementations'
      action={
        <LinkWrapper to={paths.aiImplementationRegistration()}>
          <Tooltip title='Register new AI implementation'>
            <IconButton>
              <CreateIcon />
            </IconButton>
          </Tooltip>
        </LinkWrapper>
      }
    >
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
