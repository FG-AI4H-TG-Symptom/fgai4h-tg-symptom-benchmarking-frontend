import { all } from 'redux-saga/effects'
import caseSetsSagas from './caseSets/caseSetsSagas'
import caseSetListSagas from './caseSetList/caseSetListSagas'
import aiImplementationListSagas from './aiImplementationList/aiImplementationListSagas'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function* rootSaga() {
  yield all([...caseSetsSagas])
  yield all([...caseSetListSagas])
  yield all([...aiImplementationListSagas])
}
