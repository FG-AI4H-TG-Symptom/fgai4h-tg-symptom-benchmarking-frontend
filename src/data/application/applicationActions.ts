import { createAction } from 'redux-actions'

export enum ApplicationActionTypes {
  FATAL_ERROR = 'FATAL_ERROR',
}

export const fatalError = createAction<string>(
  ApplicationActionTypes.FATAL_ERROR,
)
