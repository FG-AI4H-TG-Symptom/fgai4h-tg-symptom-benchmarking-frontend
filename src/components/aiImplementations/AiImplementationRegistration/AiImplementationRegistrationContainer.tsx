import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CircularProgress, Typography } from '@material-ui/core'

import { aiImplementationRegisterDataAction } from '../../../data/aiImplementations/aiImplementationsActions'
import { AiImplementationInfo } from '../../../data/aiImplementations/aiImplementationDataType'
import {
  DataState,
  ID_PLACEHOLDER_NEW,
  InitialState,
  LoadableCreateOnly,
} from '../../../data/util/dataState/dataStateTypes'
import { RootState } from '../../../data/rootReducer'
import { paths } from '../../../routes'
import BasicPageLayout from '../../common/BasicPageLayout'

import AiImplementationRegistrationComponent from './AiImplementationRegistrationComponent'

const AiImplementationRegistrationContainer: React.FC<{}> = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const registeredAiImplementation = useSelector<RootState, LoadableCreateOnly>(
    state => state.aiImplementations[ID_PLACEHOLDER_NEW] || InitialState,
  )

  const registerAiImplementation = (
    aiImplementation: AiImplementationInfo,
  ): void => {
    dispatch(
      aiImplementationRegisterDataAction.load(aiImplementation, {
        onSuccess: () => {
          // todo: redirect to 'view/edit AI implementation' page once available
          history.push(paths.aiImplementationManager())
        },
      }),
    )
  }

  if (registeredAiImplementation.state === DataState.LOADING) {
    return (
      <>
        <Typography variant='h2' gutterBottom>
          Registering AI implementation...
        </Typography>
        <CircularProgress />
      </>
    )
  }

  return (
    <BasicPageLayout title='Register an AI implementation'>
      <AiImplementationRegistrationComponent
        onRegisterAiImplementation={registerAiImplementation}
      />
    </BasicPageLayout>
  )
}

export default AiImplementationRegistrationContainer
