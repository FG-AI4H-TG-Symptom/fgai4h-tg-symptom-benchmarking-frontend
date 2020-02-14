import { createAction } from 'redux-actions'

import generateDataStateActions from '../util/dataState/generateDataStateActions'

import {
  AiImplementationHealth,
  AiImplementationInfo,
} from './aiImplementationDataType'

export enum AiImplementationListActionTypes {
  AI_IMPLEMENTATION_LIST_DATA = 'AI_IMPLEMENTATION_LIST_DATA',
  FETCH_AI_IMPLEMENTATION_HEALTH = 'FETCH_AI_IMPLEMENTATION_HEALTH',
  SET_AI_IMPLEMENTATION_HEALTH = 'SET_AI_IMPLEMENTATION_HEALTH',
}

export type aiImplementationListLoadParameters = { withHealth: boolean } | void

export const aiImplementationListDataActions = generateDataStateActions<
  AiImplementationInfo[],
  aiImplementationListLoadParameters
>(AiImplementationListActionTypes.AI_IMPLEMENTATION_LIST_DATA)

export const fetchAiImplementationHealth = createAction<string>(
  AiImplementationListActionTypes.FETCH_AI_IMPLEMENTATION_HEALTH,
)
export const setAiImplementationHealth = createAction<{
  name: string
  health: AiImplementationHealth
}>(AiImplementationListActionTypes.SET_AI_IMPLEMENTATION_HEALTH)
