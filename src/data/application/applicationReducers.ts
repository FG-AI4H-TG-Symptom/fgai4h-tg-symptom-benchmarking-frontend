import { ApplicationActionTypes } from './applicationActions'

export interface ApplicationState {
  fatalError?: string
}

const applicationInitialState = {}

const actionHandlers: {
  [key in ApplicationActionTypes]: (
    state: ApplicationState,
    action,
  ) => ApplicationState
} = {
  [ApplicationActionTypes.FATAL_ERROR]: (state, action) => ({
    ...state,
    fatalError: action.payload,
  }),
}

const applicationReducers = (
  state = applicationInitialState,
  action,
): ApplicationState =>
  actionHandlers[action.type]
    ? actionHandlers[action.type](state, action)
    : state
export default applicationReducers
