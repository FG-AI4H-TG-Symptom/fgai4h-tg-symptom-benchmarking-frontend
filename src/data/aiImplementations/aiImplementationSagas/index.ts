import dataStateActionSagaWrapperLoadOnly from '../../util/dataState/dataStateActionSagaWrapperLoadOnly'
import { AiImplementationsActionTypes } from '../aiImplementationsActions'
import fetchAiImplementationList from './fetchAiImplementationList'
import fetchAiImplementationHealth from './fetchAiImplementationHealth'

const aiImplementationListSagas = [
  dataStateActionSagaWrapperLoadOnly(
    AiImplementationsActionTypes.AI_IMPLEMENTATIONS_OVERVIEW_DATA_ACTION,
    fetchAiImplementationList,
  ),
  dataStateActionSagaWrapperLoadOnly(
    AiImplementationsActionTypes.AI_IMPLEMENTATION_HEALTH_DATA_ACTION,
    fetchAiImplementationHealth,
  ),
]

export default aiImplementationListSagas
