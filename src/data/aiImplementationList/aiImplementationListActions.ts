import generateDataStateActions from '../util/dataState/generateDataStateActions'

import {
  AiImplementationHealth,
  AiImplementationInfo,
} from './aiImplementationDataType'

export enum AiImplementationListActionTypes {
  AI_IMPLEMENTATION_LIST_DATA_ACTION = 'AI_IMPLEMENTATION_LIST_DATA_ACTION',
  AI_IMPLEMENTATION_HEALTH_DATA_ACTION = 'AI_IMPLEMENTATION_HEALTH_DATA_ACTION',
}

export type aiImplementationListLoadParameters = { withHealth: boolean } | void

export const aiImplementationListDataActions = generateDataStateActions<
  AiImplementationInfo[],
  aiImplementationListLoadParameters
>(AiImplementationListActionTypes.AI_IMPLEMENTATION_LIST_DATA_ACTION)

export const aiImplementationHealthDataActions = generateDataStateActions<
  AiImplementationHealth,
  string,
  string
>(AiImplementationListActionTypes.AI_IMPLEMENTATION_HEALTH_DATA_ACTION)
