import dataStateActionSagaWrapperLoadOnly from '../../util/dataState/dataStateActionSagaWrapperLoadOnly'
import { CaseSetActionTypes } from '../caseSetActions'
import fetchCaseSetList from './fetchCaseSetList'
import fetchCaseSet from './fetchCaseSet'
import createCaseSet from './createCaseSet'
import deleteCaseSet from './deleteCaseSet'

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
  dataStateActionSagaWrapperLoadOnly(
    CaseSetActionTypes.CASE_SET_DELETE_DATA_ACTION,
    deleteCaseSet,
  ),
]
export default caseSetsSagas
