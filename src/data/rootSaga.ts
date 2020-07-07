import { all } from "redux-saga/effects";
import caseSetSagas from "./caseSets/caseSetSagas";
import aiImplementationSagas from "./aiImplementations/aiImplementationSagas";
import benchmarkSagas from "./benchmarks/benchmarkSagas";

export default function* rootSaga() {
  yield all([...caseSetSagas]);
  yield all([...aiImplementationSagas]);
  yield all([...benchmarkSagas]);
}
