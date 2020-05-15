import {
  DataState,
  InitialState,
  Loadable,
} from '../util/dataState/dataStateTypes'
import dataStateGenericReducer from '../util/dataState/dataStateGenericReducer'

import { AiImplementationListActionTypes } from './aiImplementationListActions'
import {
  AiImplementationHealth,
  AiImplementationInfo,
} from './aiImplementationDataType'

export type AiImplementationListState = Loadable<{
  [id: string]: AiImplementationInfo
}>

const aiImplementationListInitialState: AiImplementationListState = InitialState

const actionHandlers: {
  [key in AiImplementationListActionTypes]: (
    state: AiImplementationListState,
    action,
  ) => AiImplementationListState
} = {
  [AiImplementationListActionTypes.AI_IMPLEMENTATION_LIST_DATA_ACTION]: dataStateGenericReducer<
    AiImplementationListState,
    AiImplementationInfo[],
    { [id: string]: AiImplementationInfo }
  >({
    dataTransform: aiImplementations => {
      const aiImplementationsMap = {}

      aiImplementations.forEach(aiImplementation => {
        aiImplementationsMap[aiImplementation.id] = aiImplementation
      })

      return aiImplementationsMap
    },
  }),
  [AiImplementationListActionTypes.AI_IMPLEMENTATION_HEALTH_DATA_ACTION]: dataStateGenericReducer<
    AiImplementationListState,
    AiImplementationHealth,
    void,
    { aiImplementationId: string }
  >({
    preflightCheck: state => {
      if (state.state !== DataState.READY) {
        throw Error('Trying to load AI health before AI list is loaded')
      }
      return true
    },
    path: action => `data.${action.meta.aiImplementationId}.health`,
  }),
}

const aiImplementationListReducer = (
  state = aiImplementationListInitialState,
  action,
): AiImplementationListState =>
  actionHandlers[action.type]
    ? actionHandlers[action.type](state, action)
    : state

export default aiImplementationListReducer
