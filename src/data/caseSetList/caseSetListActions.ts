import { CaseSetInfo } from './caseSetDataType'
import generateDataStateActions from '../util/dataState/generateDataStateActions'

export enum CaseSetListActionTypes {
  CASE_SET_LIST_DATA = 'CASE_SET_LIST_DATA',
}

export const caseSetListDataActions = generateDataStateActions<CaseSetInfo[]>(
  CaseSetListActionTypes.CASE_SET_LIST_DATA,
)
