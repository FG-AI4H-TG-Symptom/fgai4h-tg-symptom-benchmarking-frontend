import { ApplicationActionTypes } from "./applicationActions";

export interface Notification {
  message: string;
  type: "error" | "warning" | "info" | "success";
}

export interface ApplicationState {
  fatalError?: string;
  notificationQueue: Array<Notification>;
}

const applicationInitialState: ApplicationState = {
  notificationQueue: []
};

const actionHandlers: {
  [key in ApplicationActionTypes]: (
    state: ApplicationState,
    action
  ) => ApplicationState;
} = {
  [ApplicationActionTypes.SET_FATAL_ERROR]: (state, action) => ({
    ...state,
    fatalError: action.payload
  }),
  [ApplicationActionTypes.QUEUE_NOTIFICATION]: (state, action) => ({
    ...state,
    notificationQueue: state.notificationQueue.concat([action.payload])
  }),
  [ApplicationActionTypes.CLEAR_CURRENT_NOTIFICATION]: state => ({
    ...state,
    notificationQueue: state.notificationQueue.slice(1)
  })
};

const applicationReducers = (
  state = applicationInitialState,
  action
): ApplicationState =>
  actionHandlers[action.type]
    ? actionHandlers[action.type](state, action)
    : state;
export default applicationReducers;
