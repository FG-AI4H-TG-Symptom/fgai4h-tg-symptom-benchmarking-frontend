import generateDataStateActions from '../util/dataState/generateDataStateActions'

import {
  AiImplementationHealth,
  AiImplementationInfo,
} from './aiImplementationDataType'

export enum AiImplementationListActionTypes {
  AI_IMPLEMENTATIONS_OVERVIEW_DATA_ACTION = 'AI_IMPLEMENTATIONS_OVERVIEW_DATA_ACTION',
  AI_IMPLEMENTATION_HEALTH_DATA_ACTION = 'AI_IMPLEMENTATION_HEALTH_DATA_ACTION',
}

export type AiImplementationListLoadParameters = { withHealth: boolean }

export const aiImplementationListDataActions = generateDataStateActions<
  AiImplementationInfo[],
  AiImplementationListLoadParameters
>(AiImplementationListActionTypes.AI_IMPLEMENTATIONS_OVERVIEW_DATA_ACTION)

export const aiImplementationHealthDataActions = generateDataStateActions<
  AiImplementationHealth,
  string,
  string
>(AiImplementationListActionTypes.AI_IMPLEMENTATION_HEALTH_DATA_ACTION)
