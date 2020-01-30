import { createAction } from 'redux-actions'

import { CaseDataType } from './caseDataType'

export enum CaseSetsActionTypes {
  FETCH_CASE_SET = 'FETCH_CASE_SET',
  RECEIVED_CASE_SET = 'ADD_CASE_SET'
}

export const fetchCaseSet = createAction<string>(CaseSetsActionTypes.FETCH_CASE_SET)
export const addCaseSet = createAction<{ caseSetId: string; cases: CaseDataType[] }>(CaseSetsActionTypes.RECEIVED_CASE_SET)
