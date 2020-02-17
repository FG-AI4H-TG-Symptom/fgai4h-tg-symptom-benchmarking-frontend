import { CaseDataType } from './caseDataType'
import generateDataStateActions from '../util/dataState/generateDataStateActions'

export enum CaseSetsActionTypes {
  CASE_SET_DATA_ACTION = 'CASE_SET_DATA_ACTION',
}

export const caseSetDataAction = generateDataStateActions<
  CaseDataType[],
  string,
  string
>(CaseSetsActionTypes.CASE_SET_DATA_ACTION)
