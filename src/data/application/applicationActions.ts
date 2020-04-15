import { createAction } from 'redux-actions'

export enum ApplicationActionTypes {
  SET_FATAL_ERROR = 'SET_FATAL_ERROR',
}

export const setFatalError = createAction<string>(
  ApplicationActionTypes.SET_FATAL_ERROR,
)
