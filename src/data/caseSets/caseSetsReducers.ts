import { CaseDataType } from './caseDataType'
import {
  DataState,
  Loadable,
  LoadingState,
} from '../../components/util/UtilTypes'
import { CaseSetsActionTypes } from './caseSetsActions'

export interface CaseSetsState {
  [caseSetId: string]: Loadable<CaseDataType[]>
}
const caseSetsInitialState: CaseSetsState = {}

const actionHandlers: {
  [key in CaseSetsActionTypes]: (state: CaseSetsState, action) => CaseSetsState
} = {
  [CaseSetsActionTypes.FETCH_CASE_SET]: (state, action) => ({
    ...state,
    [action.payload]: LoadingState,
  }),
  [CaseSetsActionTypes.ADD_CASE_SET]: (state, action) => ({
    ...state,
    [action.payload.caseSetId]: {
      data: action.payload.cases,
      state: DataState.READY,
    },
  }),
}

const caseSetsReducers = (
  state = caseSetsInitialState,
  action,
): CaseSetsState =>
  actionHandlers[action.type]
    ? actionHandlers[action.type](state, action)
    : state
export default caseSetsReducers
