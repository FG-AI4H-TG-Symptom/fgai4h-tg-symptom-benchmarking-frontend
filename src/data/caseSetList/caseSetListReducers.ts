import { CaseSetInfo } from './caseSetDataType'
import { Loading } from '../../components/util/UtilTypes'
import { CaseSetListActionTypes } from './caseSetListActions'

export type CaseSetListState = Loading<{ caseSets: CaseSetInfo[] }>

const caseSetsInitialState: CaseSetListState = { loading: false, caseSets: [] }

const actionHandlers: {
  [key in CaseSetListActionTypes]: (
    state: CaseSetListState,
    action,
  ) => CaseSetListState
} = {
  [CaseSetListActionTypes.FETCH_CASE_SET_LIST]: state => ({
    ...state,
    loading: true,
  }),
  [CaseSetListActionTypes.SET_CASE_SET_LIST]: (state, action) => ({
    ...state,
    caseSets: action.payload,
    loading: false,
  }),
}

const caseSetListReducer = (
  state = caseSetsInitialState,
  action,
): CaseSetListState =>
  actionHandlers[action.type]
    ? actionHandlers[action.type](state, action)
    : state

export default caseSetListReducer
