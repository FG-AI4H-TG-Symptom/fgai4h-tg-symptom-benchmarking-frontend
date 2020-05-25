import dataStateActionSagaWrapperLoadOnly from '../../util/dataState/dataStateActionSagaWrapperLoadOnly'
import { CaseSetActionTypes } from '../caseSetActions'
import fetchCaseSetList from './fetchCaseSetList'
import fetchCaseSet from './fetchCaseSet'
import createCaseSet from './createCaseSet'

const caseSetsSagas = [
  dataStateActionSagaWrapperLoadOnly(
    CaseSetActionTypes.CASE_SET_LIST_DATA_ACTION,
    fetchCaseSetList,
  ),
  dataStateActionSagaWrapperLoadOnly(
    CaseSetActionTypes.CASE_SET_DATA_ACTION,
    fetchCaseSet,
  ),
  dataStateActionSagaWrapperLoadOnly(
    CaseSetActionTypes.CREATE_CASE_SET_DATA_ACTION,
    createCaseSet,
  ),
]
export default caseSetsSagas
