import { all } from 'redux-saga/effects'
import { caseSetsSagas } from './caseSetsSagas'

export default function* rootSaga() {
  yield all([
    ...caseSetsSagas
  ])
}
