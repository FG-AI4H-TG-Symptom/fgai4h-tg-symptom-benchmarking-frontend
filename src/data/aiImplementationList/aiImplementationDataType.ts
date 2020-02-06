/* eslint-disable import/prefer-default-export */

import { Loading } from '../../components/util/UtilTypes'

export enum AiImplementationHealth {
  OK = 'OK',
  Error = 'Error',
}

export type AiImplementationInfo = {
  name: string
  health: Loading<{ status: AiImplementationHealth }>
}
