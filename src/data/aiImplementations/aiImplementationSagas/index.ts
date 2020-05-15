import dataStateActionSagaWrapperLoadOnly from '../../util/dataState/dataStateActionSagaWrapperLoadOnly'
import { AiImplementationsActionTypes } from '../aiImplementationsActions'
import fetchAiImplementationList from './fetchAiImplementationList'
import fetchAiImplementationHealth from './fetchAiImplementationHealth'
import deleteAiImplementation from './deleteAiImplementation'

const aiImplementationListSagas = [
  dataStateActionSagaWrapperLoadOnly(
    AiImplementationsActionTypes.AI_IMPLEMENTATIONS_OVERVIEW_DATA_ACTION,
    fetchAiImplementationList,
  ),
  dataStateActionSagaWrapperLoadOnly(
    AiImplementationsActionTypes.AI_IMPLEMENTATION_HEALTH_DATA_ACTION,
    fetchAiImplementationHealth,
  ),
  dataStateActionSagaWrapperLoadOnly(
    AiImplementationsActionTypes.AI_IMPLEMENTATION_DELETE_DATA_ACTION,
    deleteAiImplementation,
  ),
]

export default aiImplementationListSagas
