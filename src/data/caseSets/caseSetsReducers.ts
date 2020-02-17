import { CaseDataType } from './caseDataType'
import { Loadable } from '../util/dataState/dataStateTypes'
import { CaseSetsActionTypes } from './caseSetsActions'
import dataStateGenericReducer from '../util/dataState/dataStateGenericReducer'

export interface CaseSetsState {
  [caseSetId: string]: Loadable<CaseDataType[]>
}
const caseSetsInitialState: CaseSetsState = {}

const actionHandlers: {
  [key in CaseSetsActionTypes]: (state: CaseSetsState, action) => CaseSetsState
} = {
  [CaseSetsActionTypes.CASE_SET_DATA_ACTION]: dataStateGenericReducer<
    CaseSetsState,
    CaseDataType[],
    undefined,
    string
  >({ path: action => action.payload.metadata }),
}

const caseSetsReducers = (
  state = caseSetsInitialState,
  action,
): CaseSetsState =>
  actionHandlers[action.type]
    ? actionHandlers[action.type](state, action)
    : state
export default caseSetsReducers
