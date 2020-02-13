/* eslint-disable import/prefer-default-export */

import { Loadable } from '../../components/util/UtilTypes'

export enum AiImplementationHealth {
  OK = 'OK',
  Error = 'Error',
}

export type AiImplementationInfo = {
  name: string
  health: Loadable<AiImplementationHealth>
}
