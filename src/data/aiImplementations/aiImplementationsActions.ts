import generateDataStateActions, {
  CallbackMetadata,
} from '../util/dataState/generateDataStateActions'

import {
  AiImplementationHealth,
  AiImplementationInfo,
} from './aiImplementationDataType'

export enum AiImplementationsActionTypes {
  AI_IMPLEMENTATION_CREATE_DATA_ACTION = 'AI_IMPLEMENTATION_CREATE_DATA_ACTION',
  AI_IMPLEMENTATIONS_OVERVIEW_DATA_ACTION = 'AI_IMPLEMENTATIONS_OVERVIEW_DATA_ACTION',
  AI_IMPLEMENTATION_HEALTH_DATA_ACTION = 'AI_IMPLEMENTATION_HEALTH_DATA_ACTION',
  AI_IMPLEMENTATION_DELETE_DATA_ACTION = 'AI_IMPLEMENTATION_DELETE_DATA_ACTION',
}

export const aiImplementationRegisterDataAction = generateDataStateActions<
  AiImplementationInfo,
  AiImplementationInfo,
  void,
  CallbackMetadata<AiImplementationInfo>
>(AiImplementationsActionTypes.AI_IMPLEMENTATION_CREATE_DATA_ACTION)

export type AiImplementationListLoadParameters = { withHealth: boolean }

export const aiImplementationOverviewDataAction = generateDataStateActions<
  AiImplementationInfo[],
  AiImplementationListLoadParameters
>(AiImplementationsActionTypes.AI_IMPLEMENTATIONS_OVERVIEW_DATA_ACTION)

export const aiImplementationHealthDataAction = generateDataStateActions<
  AiImplementationHealth,
  string,
  string
>(AiImplementationsActionTypes.AI_IMPLEMENTATION_HEALTH_DATA_ACTION)

export const aiImplementationDeleteDataAction = generateDataStateActions<
  void,
  string,
  { aiImplementationId: string },
  CallbackMetadata<void>
>(AiImplementationsActionTypes.AI_IMPLEMENTATION_DELETE_DATA_ACTION)
