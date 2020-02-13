import { AiImplementationInfo } from './aiImplementationDataType'
import {
  DataState,
  InitialState,
  Loadable,
  LoadingState,
} from '../../components/util/UtilTypes'
import { AiImplementationListActionTypes } from './aiImplementationListActions'

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
  [AiImplementationListActionTypes.FETCH_AI_IMPLEMENTATION_LIST]: () =>
    LoadingState,
  [AiImplementationListActionTypes.SET_AI_IMPLEMENTATION_LIST]: (
    state,
    action,
  ) => {
    const aiImplementations = {}

    action.payload.forEach(aiImplementation => {
      aiImplementations[aiImplementation.name] = aiImplementation
    })

    return {
      data: aiImplementations,
      state: DataState.READY,
    }
  },
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
