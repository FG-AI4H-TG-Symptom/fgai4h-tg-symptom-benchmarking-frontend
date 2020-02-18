import { combineReducers } from 'redux'
import caseSetReducers, { CaseSetsState } from './caseSets/caseSetReducers'
import aiImplementationListReducer, {
  AiImplementationListState,
} from './aiImplementationList/aiImplementationListReducers'
import benchmarkReducers, {
  BenchmarkState,
} from './benchmarks/benchmarkReducers'
import applicationReducers, {
  ApplicationState,
} from './application/applicationReducers'

export interface RootState {
  application: ApplicationState
  caseSets: CaseSetsState
  aiImplementationList: AiImplementationListState
  benchmark: BenchmarkState
}

const rootReducer = combineReducers({
  application: applicationReducers,
  caseSets: caseSetReducers,
  aiImplementationList: aiImplementationListReducer,
  benchmark: benchmarkReducers,
})

export default rootReducer
