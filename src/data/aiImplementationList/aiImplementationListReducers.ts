import { AiImplementationInfo } from './aiImplementationDataType'
import { Loading } from '../../components/util/UtilTypes'
import { AiImplementationListActionTypes } from './aiImplementationListActions'

export type AiImplementationListState = Loading<{
  aiImplementations: AiImplementationInfo[]
}>

const aiImplementationListInitialState: AiImplementationListState = {
  loading: false,
  aiImplementations: [],
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
  ) => ({
    ...state,
    aiImplementations: action.payload,
    loading: false,
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
