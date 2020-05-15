import generateDataStateActions from '../util/dataState/generateDataStateActions'

import { CaseSetInfo } from './caseSetDataType'
import { CaseDataType } from './caseDataType'

export type CreateCaseSetParameters = {
  numberOfCases: number
}

export enum CaseSetActionTypes {
  CASE_SET_LIST_DATA_ACTION = 'CASE_SET_LIST_DATA_ACTION',
  CREATE_CASE_SET_DATA_ACTION = 'CREATE_CASE_SET_DATA_ACTION',
  CASE_SET_DATA_ACTION = 'CASE_SET_DATA_ACTION',
}

export const caseSetListDataActions = generateDataStateActions<CaseSetInfo[]>(
  CaseSetActionTypes.CASE_SET_LIST_DATA_ACTION,
)
export const createCaseSetDataActions = generateDataStateActions<
  string,
  CreateCaseSetParameters
>(CaseSetActionTypes.CREATE_CASE_SET_DATA_ACTION)
export const caseSetDataAction = generateDataStateActions<
  CaseDataType[],
  string,
  { caseSetId: string }
>(CaseSetActionTypes.CASE_SET_DATA_ACTION)
