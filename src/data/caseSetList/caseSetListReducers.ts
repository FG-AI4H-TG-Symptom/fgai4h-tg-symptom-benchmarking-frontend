import { CaseSetInfo } from './caseSetDataType'
import {
  DataState,
  InitialState,
  Loadable,
  LoadingState,
} from '../../components/util/UtilTypes'
import { CaseSetListActionTypes } from './caseSetListActions'

export type CaseSetListState = Loadable<CaseSetInfo[]>

const caseSetsInitialState: CaseSetListState = InitialState

const actionHandlers: {
  [key in CaseSetListActionTypes]: (
    state: CaseSetListState,
    action,
  ) => CaseSetListState
} = {
  [CaseSetListActionTypes.FETCH_CASE_SET_LIST]: () => LoadingState,
  [CaseSetListActionTypes.SET_CASE_SET_LIST]: (state, action) => ({
    data: action.payload,
    state: DataState.READY,
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
