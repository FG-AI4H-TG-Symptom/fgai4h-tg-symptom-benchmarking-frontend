/* eslint-disable import/prefer-default-export */

import { Loadable } from '../util/dataState/dataStateTypes'
import BaseConcept from '../util/baseConcept'

export enum AiImplementationHealth {
  OK = 'OK',
  Error = 'Error',
}

export type AiImplementationInfo = BaseConcept & {
  name: string
  baseUrl: string
  health: Loadable<AiImplementationHealth>
}
