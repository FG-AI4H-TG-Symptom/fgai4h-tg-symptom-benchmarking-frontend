import { CaseDataType } from './caseDataType'
import { Loading } from '../../components/util/UtilTypes'
import { CaseSetsActionTypes } from './caseSetsActions'

export interface CaseSetsState {
  [caseSetId: string]: Loading<{cases: CaseDataType[]}>;
}
const caseSetsInitialState: CaseSetsState = {}

const actionHandlers: { [key in CaseSetsActionTypes]: (state: CaseSetsState, action) => CaseSetsState } = {
  [CaseSetsActionTypes.FETCH_CASE_SET]: (state, action) => ({ ...state, [action.payload]: { loading: true } }),
  [CaseSetsActionTypes.RECEIVED_CASE_SET]: (state, action) => ({ ...state, [action.payload.caseSetId]: { cases: action.payload.cases, loading: false } })
}

const caseSetsReducers = (state = caseSetsInitialState, action): CaseSetsState => (
  actionHandlers[action.type] ? actionHandlers[action.type](state, action) : state
)
export default caseSetsReducers
