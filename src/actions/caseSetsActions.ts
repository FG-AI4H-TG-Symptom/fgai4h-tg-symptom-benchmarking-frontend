import { createAction } from 'redux-actions'

import { RECEIVED_CASE_SET, FETCH_CASE_SET, LOADING_CASE_SET } from '../constants/actionTypes'
import { CaseData } from '../types/CaseData'

export const fetchCaseSet = createAction<string>(FETCH_CASE_SET)
export const loadingCaseSet = createAction<string>(LOADING_CASE_SET)
export const addCaseSet = createAction<{ caseSetId: string, cases: CaseData[] }>(RECEIVED_CASE_SET)
