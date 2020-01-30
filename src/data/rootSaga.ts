import { all } from 'redux-saga/effects'
import { caseSetsSagas } from './caseSets/caseSetsSagas'

export default function* rootSaga() {
  yield all([
    ...caseSetsSagas
  ])
}
