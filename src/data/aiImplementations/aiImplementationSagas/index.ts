import dataStateActionSagaWrapperLoadOnly from '../../util/dataState/dataStateActionSagaWrapperLoadOnly'
import { AiImplementationListActionTypes } from '../aiImplementationListActions'
import fetchAiImplementationList from './fetchAiImplementationList'
import fetchAiImplementationHealth from './fetchAiImplementationHealth'

const aiImplementationListSagas = [
  dataStateActionSagaWrapperLoadOnly(
    AiImplementationListActionTypes.AI_IMPLEMENTATIONS_OVERVIEW_DATA_ACTION,
    fetchAiImplementationList,
  ),
  dataStateActionSagaWrapperLoadOnly(
    AiImplementationListActionTypes.AI_IMPLEMENTATION_HEALTH_DATA_ACTION,
    fetchAiImplementationHealth,
  ),
]

export default aiImplementationListSagas
