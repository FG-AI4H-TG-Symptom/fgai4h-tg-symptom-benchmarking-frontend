import { combineReducers } from "redux";
import { CaseSetsState } from "./caseSets/caseSetReducers";
import { AiImplementationsState } from "./aiImplementations/aiImplementationsReducers";
import { BenchmarkState } from "./benchmarks/benchmarkReducers";
import applicationReducers, {
  ApplicationState
} from "./application/applicationReducers";

import aiReducer from "./aiDuck";
import datasetReducer from "./datasetDuck";
import sessionsReducer from "./sessionsDuck";

export interface RootState {
  application: ApplicationState;
  caseSets: CaseSetsState;
  aiImplementations: AiImplementationsState;
  benchmark: BenchmarkState;
}
export type RootStateEntries = keyof RootState;

const reducers = {
  application: applicationReducers,
  // caseSets: caseSetReducers,
  // aiImplementations: aiImplementationListReducers,
  // benchmark: benchmarkReducers,
  AIs: aiReducer,
  datasets: datasetReducer,
  sessions: sessionsReducer
};
const rootReducer = combineReducers(reducers);

export default rootReducer;
