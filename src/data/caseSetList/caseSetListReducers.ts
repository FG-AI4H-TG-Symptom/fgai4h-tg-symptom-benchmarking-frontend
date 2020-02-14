import { CaseSetInfo } from './caseSetDataType'
import { InitialState, Loadable } from '../util/dataState/dataStateTypes'
import { CaseSetListActionTypes } from './caseSetListActions'
import dataStateGenericReducer from '../util/dataState/dataStateGenericReducer'

export type CaseSetListState = Loadable<CaseSetInfo[]>

const caseSetsInitialState: CaseSetListState = InitialState

const actionHandlers: {
  [key in CaseSetListActionTypes]: (
    state: CaseSetListState,
    action,
  ) => CaseSetListState
} = {
  [CaseSetListActionTypes.CASE_SET_LIST_DATA]: dataStateGenericReducer(),
}

const caseSetListReducer = (
  state = caseSetsInitialState,
  action,
): CaseSetListState =>
  actionHandlers[action.type]
    ? actionHandlers[action.type](state, action)
    : state

export default caseSetListReducer
