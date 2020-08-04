import { createAction } from "redux-actions";

export enum ApplicationActionTypes {
  SET_FATAL_ERROR = "SET_FATAL_ERROR",
  QUEUE_NOTIFICATION = "QUEUE_NOTIFICATION",
  CLEAR_CURRENT_NOTIFICATION = "CLEAR_CURRENT_NOTIFICATION",
}

export const clearCurrentNotification = createAction<Notification>(
  ApplicationActionTypes.CLEAR_CURRENT_NOTIFICATION
);
