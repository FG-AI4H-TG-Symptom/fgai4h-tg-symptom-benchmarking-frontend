import { combineReducers } from 'redux'
import caseSetsReducers, { CaseSetsState } from './caseSets/caseSetsReducers'
import caseSetListReducers, {
  CaseSetListState,
} from './caseSetList/caseSetListReducers'

export interface RootState {
  caseSets: CaseSetsState
  caseSetList: CaseSetListState
}

const rootReducer = combineReducers({
  caseSets: caseSetsReducers,
  caseSetList: caseSetListReducers,
})

export default rootReducer
