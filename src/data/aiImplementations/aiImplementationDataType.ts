/* eslint-disable import/prefer-default-export */

import { Loadable } from '../util/dataState/dataStateTypes'
import { BaseNamedConcept } from '../util/baseConceptTypes'

export enum AiImplementationHealth {
  OK = 'OK',
  Error = 'Error',
}

export type AiImplementationInfo = BaseNamedConcept & {
  name: string
  baseUrl: string
  health: Loadable<AiImplementationHealth>
}
