import dotProp from 'dot-prop-immutable'

import {
  DataActionBaseState,
  dataActionBaseStateInitial,
  DataState,
  ID_PLACEHOLDER_NEW,
  IdPlaceholderNew,
} from '../util/dataState/dataStateTypes'
import dataStateGenericReducer, {
  createOptions,
  dataStateSaveReducer,
  deleteOptions,
} from '../util/dataState/dataStateGenericReducer'
import { CallbackMetadata } from '../util/dataState/generateDataStateActions'

import { CaseSetInfo } from './caseSetDataType'
import { CaseSetActionTypes } from './caseSetActions'
import { CaseDataType } from './caseDataType'

export type CaseSetsState = DataActionBaseState<CaseSetInfo>

const caseSetsInitialState: CaseSetsState = dataActionBaseStateInitial()

const actionHandlers: {
  [key in CaseSetActionTypes]: (state: CaseSetsState, action) => CaseSetsState
} = {
  [CaseSetActionTypes.CASE_SET_LIST_DATA_ACTION]: dataStateGenericReducer({
    path: 'overview',
  }),
  [CaseSetActionTypes.CREATE_CASE_SET_DATA_ACTION]: dataStateGenericReducer<
    CaseSetsState,
    CaseSetInfo,
    void,
    CallbackMetadata<CaseSetInfo>
  >(createOptions<CaseSetInfo, CaseSetsState>()),
  [CaseSetActionTypes.CASE_SET_DATA_ACTION]: dataStateGenericReducer<
    CaseSetsState,
    CaseDataType[],
    void,
    { caseSetId: string }
  >({ path: action => `entries.${action.meta.caseSetId}` }),
  [CaseSetActionTypes.CASE_SET_SAVE_DATA_ACTION]: dataStateSaveReducer<
    CaseSetInfo,
    CaseSetsState,
    { caseSetId: string | IdPlaceholderNew }
  >('caseSetId'),
  [CaseSetActionTypes.CASE_SET_DELETE_DATA_ACTION]: dataStateGenericReducer<
    CaseSetsState,
    void,
    void,
    { caseSetId: string } & CallbackMetadata<void>
  >(deleteOptions<CaseSetInfo, CaseSetsState>('caseSetId')),
  [CaseSetActionTypes.CASE_SET_SAVE_CASE_DATA_ACTION]: dataStateSaveReducer<
    CaseSetInfo,
    CaseSetsState,
    { caseSetId: string; caseId: string | IdPlaceholderNew },
    CaseDataType
  >('caseId', {
    updateEntry(state, action) {
      const entry = state.entries[action.meta.caseSetId]
      if (!entry || entry.state !== DataState.READY) {
        return state
      }
      const caseIndex =
        action.meta.caseId === ID_PLACEHOLDER_NEW
          ? entry.data.cases.length // append
          : entry.data.cases.findIndex(({ id }) => id === action.meta.caseId)

      return dotProp.set(
        state,
        `entries.${action.meta.caseSetId}.data.cases[${caseIndex}]`,
        action.payload.data,
      )
    },
    /*
      in the overview the case sets only have the cases as IDs
     */
    updateOverview(state, action) {
      if (state.overview.state !== DataState.READY) {
        return state
      }

      const overview = state.overview.data

      const caseSetIndex = overview.findIndex(
        ({ id }) => id === action.meta.caseSetId,
      )
      const caseSet = overview[caseSetIndex]

      /* eslint-disable @typescript-eslint/no-explicit-any */
      const caseIndex =
        action.meta.caseId === ID_PLACEHOLDER_NEW
          ? caseSet.cases.length // append
          : ((caseSet.cases as any) as Array<string>).indexOf(
              action.meta.caseId,
            )
      /* eslint-enable @typescript-eslint/no-explicit-any */

      return dotProp.set(
        state,
        `overview.data[${caseSetIndex}].cases[${caseIndex}]`,
        action.payload.data.id,
      )
    },
  }),
}

const caseSetReducer = (state = caseSetsInitialState, action): CaseSetsState =>
  actionHandlers[action.type]
    ? actionHandlers[action.type](state, action)
    : state

export default caseSetReducer
