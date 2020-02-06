import { createAction } from 'redux-actions'

import {
  AiImplementationHealth,
  AiImplementationInfo,
} from './aiImplementationDataType'

export enum AiImplementationListActionTypes {
  FETCH_AI_IMPLEMENTATION_LIST = 'FETCH_AI_IMPLEMENTATION_LIST',
  SET_AI_IMPLEMENTATION_LIST = 'SET_AI_IMPLEMENTATION_LIST',
  FETCH_AI_IMPLEMENTATION_HEALTH = 'FETCH_AI_IMPLEMENTATION_HEALTH',
  SET_AI_IMPLEMENTATION_HEALTH = 'SET_AI_IMPLEMENTATION_HEALTH',
}

export const fetchAiImplementationList = createAction<void>(
  AiImplementationListActionTypes.FETCH_AI_IMPLEMENTATION_LIST,
)
export const setAiImplementationList = createAction<AiImplementationInfo[]>(
  AiImplementationListActionTypes.SET_AI_IMPLEMENTATION_LIST,
)

export const fetchAiImplementationHealth = createAction<void>(
  AiImplementationListActionTypes.FETCH_AI_IMPLEMENTATION_HEALTH,
)
export const setAiImplementationHealth = createAction<{
  name: string
  health: AiImplementationHealth
}>(AiImplementationListActionTypes.SET_AI_IMPLEMENTATION_HEALTH)
