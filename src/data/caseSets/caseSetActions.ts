import generateDataStateActions, {
  CallbackMetadata,
} from '../util/dataState/generateDataStateActions'
import { IdPlaceholderNew } from '../util/dataState/dataStateTypes'

import { CaseSetInfo } from './caseSetDataType'
import { CaseDataType } from './caseDataType'

export type CreateCaseSetParameters = {
  numberOfCases: number
}

export enum CaseSetActionTypes {
  CASE_SET_LIST_DATA_ACTION = 'CASE_SET_LIST_DATA_ACTION',
  CREATE_CASE_SET_DATA_ACTION = 'CREATE_CASE_SET_DATA_ACTION',
  CASE_SET_DATA_ACTION = 'CASE_SET_DATA_ACTION',
  CASE_SET_SAVE_DATA_ACTION = 'CASE_SET_SAVE_DATA_ACTION',
  CASE_SET_SAVE_CASE_DATA_ACTION = 'CASE_SET_SAVE_CASE_DATA_ACTION',
  CASE_SET_DELETE_DATA_ACTION = 'CASE_SET_DELETE_DATA_ACTION',
}

export const caseSetListDataActions = generateDataStateActions<CaseSetInfo[]>(
  CaseSetActionTypes.CASE_SET_LIST_DATA_ACTION,
)

export const createCaseSetDataActions = generateDataStateActions<
  string,
  CreateCaseSetParameters,
  void,
  CallbackMetadata<CaseSetInfo>
>(CaseSetActionTypes.CREATE_CASE_SET_DATA_ACTION)

export const caseSetDataAction = generateDataStateActions<
  CaseDataType[],
  string,
  { caseSetId: string }
>(CaseSetActionTypes.CASE_SET_DATA_ACTION)

export const caseSetSaveDataAction = generateDataStateActions<
  CaseSetInfo,
  CaseSetInfo | Omit<CaseSetInfo, 'id'>,
  { caseSetId: string | IdPlaceholderNew },
  CallbackMetadata<CaseSetInfo>
>(CaseSetActionTypes.CASE_SET_SAVE_DATA_ACTION)

export const caseSetSaveCaseDataAction = generateDataStateActions<
  CaseDataType,
  CaseDataType | Omit<CaseDataType, 'id'>,
  { caseSetId: string; caseId: string | IdPlaceholderNew },
  CallbackMetadata<CaseDataType>
>(CaseSetActionTypes.CASE_SET_SAVE_CASE_DATA_ACTION)

export const caseSetDeleteDataAction = generateDataStateActions<
  void,
  string,
  { caseSetId: string },
  CallbackMetadata<void>
>(CaseSetActionTypes.CASE_SET_DELETE_DATA_ACTION)
