import {
  DataActionBaseState,
  dataActionBaseStateInitial,
} from '../util/dataState/dataStateTypes'
import dataStateGenericReducer, {
  createOptions,
  deleteOptions,
} from '../util/dataState/dataStateGenericReducer'
import { CallbackMetadata } from '../util/dataState/generateDataStateActions'

import { CaseSetInfo } from './caseSetDataType'
import { CaseSetActionTypes } from './caseSetActions'
import { CaseDataType } from './caseDataType'

export type CaseSetsState = DataActionBaseState<CaseSetInfo>

const caseSetsInitialState: CaseSetsState = dataActionBaseStateInitial()

const actionHandlers: {
  [key in CaseSetActionTypes]: (state: CaseSetsState, action) => CaseSetsState
} = {
  [CaseSetActionTypes.CASE_SET_LIST_DATA_ACTION]: dataStateGenericReducer({
    path: 'overview',
  }),
  [CaseSetActionTypes.CREATE_CASE_SET_DATA_ACTION]: dataStateGenericReducer<
    CaseSetsState,
    CaseSetInfo,
    void,
    CallbackMetadata<CaseSetInfo>
  >(createOptions<CaseSetInfo, CaseSetsState>()),
  [CaseSetActionTypes.CASE_SET_DATA_ACTION]: dataStateGenericReducer<
    CaseSetsState,
    CaseDataType[],
    void,
    { caseSetId: string }
  >({ path: action => `entries.${action.meta.caseSetId}` }),
  [CaseSetActionTypes.CASE_SET_DELETE_DATA_ACTION]: dataStateGenericReducer<
    CaseSetsState,
    void,
    void,
    { caseSetId: string } & CallbackMetadata<void>
  >(deleteOptions<CaseSetInfo, CaseSetsState>('caseSetId')),
}

const caseSetReducer = (state = caseSetsInitialState, action): CaseSetsState =>
  actionHandlers[action.type]
    ? actionHandlers[action.type](state, action)
    : state

export default caseSetReducer
