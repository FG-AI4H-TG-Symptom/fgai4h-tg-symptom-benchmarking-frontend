import { combineReducers } from 'redux'
import caseSetsReducers, { CaseSetsState } from './caseSets/caseSetsReducers'
import caseSetListReducers, {
  CaseSetListState,
} from './caseSetList/caseSetListReducers'
import aiImplementationListReducer, {
  AiImplementationListState,
} from './aiImplementationList/aiImplementationListReducers'
import benchmarkReducers, {
  BenchmarkState,
} from './benchmarks/benchmarkReducers'

export interface RootState {
  caseSets: CaseSetsState
  caseSetList: CaseSetListState
  aiImplementationList: AiImplementationListState
  benchmark: BenchmarkState
}

const rootReducer = combineReducers({
  caseSets: caseSetsReducers,
  caseSetList: caseSetListReducers,
  aiImplementationList: aiImplementationListReducer,
  benchmark: benchmarkReducers,
})

export default rootReducer
