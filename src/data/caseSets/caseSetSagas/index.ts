import dataStateActionSagaWrapperLoadOnly from '../../util/dataState/dataStateActionSagaWrapperLoadOnly'
import { CaseSetActionTypes } from '../caseSetActions'
import fetchCaseSetList from './fetchCaseSetList'
import fetchCaseSet from './fetchCaseSet'
import createCaseSet from './createCaseSet'
import deleteCaseSet from './deleteCaseSet'
import saveCaseSet from './saveCaseSet'
import saveCase from './saveCase'

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
    CaseSetActionTypes.CASE_SET_SAVE_DATA_ACTION,
    saveCaseSet,
  ),
  dataStateActionSagaWrapperLoadOnly(
    CaseSetActionTypes.CASE_SET_DELETE_DATA_ACTION,
    deleteCaseSet,
  ),
  dataStateActionSagaWrapperLoadOnly(
    CaseSetActionTypes.CASE_SET_SAVE_CASE_DATA_ACTION,
    saveCase,
  ),
]
export default caseSetsSagas
