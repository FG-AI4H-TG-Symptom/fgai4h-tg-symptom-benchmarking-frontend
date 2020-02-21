import { CaseSetInfo } from './caseSetDataType'
import { InitialState, Loadable } from '../util/dataState/dataStateTypes'
import { CaseSetActionTypes } from './caseSetActions'
import dataStateGenericReducer from '../util/dataState/dataStateGenericReducer'
import { CaseDataType } from './caseDataType'

export type CaseSetsState = {
  overview: Loadable<CaseSetInfo[]>
  entries: {
    [caseSetId: string]: Loadable<CaseDataType[]>
  }
  created: Loadable<string>
}

const caseSetsInitialState: CaseSetsState = {
  overview: InitialState,
  created: InitialState,
  entries: {},
}

const actionHandlers: {
  [key in CaseSetActionTypes]: (state: CaseSetsState, action) => CaseSetsState
} = {
  [CaseSetActionTypes.CASE_SET_LIST_DATA_ACTION]: dataStateGenericReducer({
    path: 'overview',
  }),
  [CaseSetActionTypes.CREATE_CASE_SET_DATA_ACTION]: dataStateGenericReducer({
    path: 'created',
  }),

  [CaseSetActionTypes.CASE_SET_DATA_ACTION]: dataStateGenericReducer<
    CaseSetsState,
    CaseDataType[],
    undefined,
    string
  >({ path: action => `entries.${action.payload.metadata}` }),
}

const caseSetReducer = (state = caseSetsInitialState, action): CaseSetsState =>
  actionHandlers[action.type]
    ? actionHandlers[action.type](state, action)
    : state

export default caseSetReducer