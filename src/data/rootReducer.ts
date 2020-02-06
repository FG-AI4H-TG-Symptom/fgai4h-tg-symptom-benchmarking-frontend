import { combineReducers } from 'redux'
import caseSetsReducers, { CaseSetsState } from './caseSets/caseSetsReducers'
import caseSetListReducers, {
  CaseSetListState,
} from './caseSetList/caseSetListReducers'
import aiImplementationListReducer, {
  AiImplementationListState,
} from './aiImplementationList/aiImplementationListReducers'

export interface RootState {
  caseSets: CaseSetsState
  caseSetList: CaseSetListState
  aiImplementationList: AiImplementationListState
}

const rootReducer = combineReducers({
  caseSets: caseSetsReducers,
  caseSetList: caseSetListReducers,
  aiImplementationList: aiImplementationListReducer,
})

export default rootReducer
