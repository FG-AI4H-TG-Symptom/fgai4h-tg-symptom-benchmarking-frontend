import {
  DataActionBaseState,
  dataActionBaseStateInitial,
  DataState,
} from '../util/dataState/dataStateTypes'
import dataStateGenericReducer from '../util/dataState/dataStateGenericReducer'

import { AiImplementationsActionTypes } from './aiImplementationsActions'
import {
  AiImplementationHealth,
  AiImplementationInfo,
} from './aiImplementationDataType'

export type AiImplementationsState = DataActionBaseState<AiImplementationInfo>

const aiImplementationsInitialState: AiImplementationsState = dataActionBaseStateInitial()

const actionHandlers: {
  [key in AiImplementationsActionTypes]: (
    state: AiImplementationsState,
    action,
  ) => AiImplementationsState
} = {
  [AiImplementationsActionTypes.AI_IMPLEMENTATIONS_OVERVIEW_DATA_ACTION]: dataStateGenericReducer<
    AiImplementationsState,
    AiImplementationInfo[],
    { [id: string]: AiImplementationInfo }
  >({
    path: 'overview',
  }),
  [AiImplementationsActionTypes.AI_IMPLEMENTATION_HEALTH_DATA_ACTION]: dataStateGenericReducer<
    AiImplementationsState,
    AiImplementationHealth,
    void,
    { aiImplementationId: string }
  >({
    preflightCheck: state => {
      if (state.overview.state !== DataState.READY) {
        throw Error('Trying to load AI health before AI list is loaded')
      }
      return true
    },
    path: action => `overview.data.${action.meta.aiImplementationId}.health`,
  }),
}

const aiImplementationListReducer = (
  state = aiImplementationsInitialState,
  action,
): AiImplementationsState =>
  actionHandlers[action.type]
    ? actionHandlers[action.type](state, action)
    : state

export default aiImplementationListReducer
