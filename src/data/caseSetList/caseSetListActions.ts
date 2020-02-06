import { createAction } from 'redux-actions'

import { CaseSetInfo } from './caseSetDataType'

export enum CaseSetListActionTypes {
  FETCH_CASE_SET_LIST = 'FETCH_CASE_SET_LIST',
  SET_CASE_SET_LIST = 'SET_CASE_SET_LIST',
}

export const fetchCaseSetList = createAction<void>(
  CaseSetListActionTypes.FETCH_CASE_SET_LIST,
)
export const setCaseSetList = createAction<CaseSetInfo[]>(
  CaseSetListActionTypes.SET_CASE_SET_LIST,
)
