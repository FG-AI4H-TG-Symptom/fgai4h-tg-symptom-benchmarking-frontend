import { LOADING_CASE_SET, RECEIVED_CASE_SET } from '../constants/actionTypes'
import { CaseData } from '../types/CaseData'
import { Loading } from '../types/UtilTypes'

export interface CaseSetsState {
  [caseSetId: string]: Loading<{cases: CaseData[]}>
}
const caseSetsInitialState: CaseSetsState = {}

export default function caseSetsReducers(state = caseSetsInitialState, action): CaseSetsState {
  switch (action.type) {
    case LOADING_CASE_SET:
      return { ...state, [action.payload]: { loading: true } }
    case RECEIVED_CASE_SET:
      return { ...state, [action.payload.caseSetId]: { cases: action.payload.cases, loading: false } }
    default:
      return state
  }
}
