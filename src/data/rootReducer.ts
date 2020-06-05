import { combineReducers } from 'redux'
import caseSetReducers, { CaseSetsState } from './caseSets/caseSetReducers'
import aiImplementationListReducers, {
  AiImplementationsState,
} from './aiImplementations/aiImplementationsReducers'
import benchmarkReducers, {
  BenchmarkState,
} from './benchmarks/benchmarkReducers'
import applicationReducers, {
  ApplicationState,
} from './application/applicationReducers'

export interface RootState {
  application: ApplicationState
  caseSets: CaseSetsState
  aiImplementations: AiImplementationsState
  benchmark: BenchmarkState
}
export type RootStateEntries = keyof RootState

const reducers: {
  [entryPoint in RootStateEntries]: (
    state: RootState[entryPoint],
    action,
  ) => RootState[entryPoint]
} = {
  application: applicationReducers,
  caseSets: caseSetReducers,
  aiImplementations: aiImplementationListReducers,
  benchmark: benchmarkReducers,
}
const rootReducer = combineReducers(reducers)

export default rootReducer
