import { createAction } from 'redux-actions'

import { AiImplementationInfo } from './aiImplementationDataType'

export enum AiImplementationListActionTypes {
  FETCH_AI_IMPLEMENTATION_LIST = 'FETCH_AI_IMPLEMENTATION_LIST',
  SET_AI_IMPLEMENTATION_LIST = 'SET_AI_IMPLEMENTATION_LIST',
}

export const fetchAiImplementationList = createAction<void>(
  AiImplementationListActionTypes.FETCH_AI_IMPLEMENTATION_LIST,
)
export const setAiImplementationList = createAction<AiImplementationInfo[]>(
  AiImplementationListActionTypes.SET_AI_IMPLEMENTATION_LIST,
)
