import { all } from 'redux-saga/effects'
import caseSetSagas from './caseSets/caseSetSagas'
import aiImplementationListSagas from './aiImplementationList/aiImplementationListSagas'
import benchmarkSagas from './benchmarks/benchmarkSagas'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function* rootSaga() {
  yield all([...caseSetSagas])
  yield all([...aiImplementationListSagas])
  yield all([...benchmarkSagas])
}
