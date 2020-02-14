import { AiImplementationInfo } from './aiImplementationDataType'
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
  [AiImplementationListActionTypes.AI_IMPLEMENTATION_LIST_DATA]: dataStateGenericReducer<
    AiImplementationListState,
    AiImplementationInfo[],
    { [name: string]: AiImplementationInfo }
  >(aiImplementations => {
    const aiImplementationsMap = {}

    aiImplementations.forEach(aiImplementation => {
      aiImplementationsMap[aiImplementation.name] = aiImplementation
    })

    return aiImplementationsMap
  }),
  [AiImplementationListActionTypes.FETCH_AI_IMPLEMENTATION_HEALTH]: (
    state,
    action,
  ) => {
    if (state.state !== DataState.READY) {
      throw Error('Trying to load AI health before AI list is loaded')
    }
    return {
      ...state,
      data: {
        ...state.data,
        [action.payload]: {
          ...state.data[action.payload],
          health: DataState.LOADING,
        },
      },
    }
  },
  [AiImplementationListActionTypes.SET_AI_IMPLEMENTATION_HEALTH]: (
    state,
    action,
  ) => {
    if (state.state !== DataState.READY) {
      throw Error('Trying to store AI health before AI list is loaded')
    }
    return {
      ...state,
      data: {
        ...state.data,
        [action.payload.name]: {
          ...state.data[action.payload.name],
          health: { state: DataState.READY, data: action.payload.health },
        },
      },
    }
  },
}

const aiImplementationListReducer = (
  state = aiImplementationListInitialState,
  action,
): AiImplementationListState =>
  actionHandlers[action.type]
    ? actionHandlers[action.type](state, action)
    : state

export default aiImplementationListReducer
