import { AiImplementationInfo } from './aiImplementationDataType'
import { Loading } from '../../components/util/UtilTypes'
import { AiImplementationListActionTypes } from './aiImplementationListActions'

export type AiImplementationListState = Loading<{
  aiImplementations: {
    [name: string]: AiImplementationInfo
  }
}>

const aiImplementationListInitialState: AiImplementationListState = {
  loading: false,
  aiImplementations: {},
}

const actionHandlers: {
  [key in AiImplementationListActionTypes]: (
    state: AiImplementationListState,
    action,
  ) => AiImplementationListState
} = {
  [AiImplementationListActionTypes.FETCH_AI_IMPLEMENTATION_LIST]: state => ({
    ...state,
    loading: true,
  }),
  [AiImplementationListActionTypes.SET_AI_IMPLEMENTATION_LIST]: (
    state,
    action,
  ) => {
    const aiImplementations = {}

    action.payload.forEach(aiImplementation => {
      aiImplementations[aiImplementation.name] = aiImplementation
    })

    return {
      ...state,
      aiImplementations,
      loading: false,
    }
  },
  [AiImplementationListActionTypes.FETCH_AI_IMPLEMENTATION_HEALTH]: (
    state,
    action,
  ) => {
    if (state.loading === true) {
      throw Error('Trying to load AI health before AI list is loaded')
    }
    return {
      ...state,
      aiImplementations: {
        ...state.aiImplementations,
        [action.payload]: {
          ...state.aiImplementations[action.payload],
          health: { loading: true },
        },
      },
    }
  },
  [AiImplementationListActionTypes.SET_AI_IMPLEMENTATION_HEALTH]: (
    state,
    action,
  ) => {
    if (state.loading === true) {
      throw Error('Trying to load AI health before AI list is loaded')
    }
    return {
      ...state,
      aiImplementations: {
        ...state.aiImplementations,
        [action.payload.name]: {
          ...state.aiImplementations[action.payload.name],
          health: { loading: false, status: action.payload.health },
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
