import {
  AiImplementationHealth,
  AiImplementationInfo,
} from './aiImplementationDataType'
import {
  DataState,
  InitialState,
  Loadable,
} from '../util/dataState/dataStateTypes'
import { AiImplementationListActionTypes } from './aiImplementationListActions'
import dataStateGenericReducer from '../util/dataState/dataStateGenericReducer'

export type AiImplementationListState = Loadable<{
  [name: string]: AiImplementationInfo
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
    { [name: string]: AiImplementationInfo }
  >({
    dataTransform: aiImplementations => {
      const aiImplementationsMap = {}

      aiImplementations.forEach(aiImplementation => {
        aiImplementationsMap[aiImplementation.name] = aiImplementation
      })

      return aiImplementationsMap
    },
  }),
  [AiImplementationListActionTypes.AI_IMPLEMENTATION_HEALTH_DATA_ACTION]: dataStateGenericReducer<
    AiImplementationListState,
    AiImplementationHealth,
    string
  >({
    preflight: state => {
      if (state.state !== DataState.READY) {
        throw Error('Trying to load AI health before AI list is loaded')
      }
      return true
    },
    path: action => `data.${action.payload.metadata}.health`,
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
