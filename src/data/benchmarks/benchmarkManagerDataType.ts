/* eslint-disable import/prefer-default-export */
import { Loadable } from '../util/dataState/dataStateTypes'
import { BaseConcept } from '../util/baseConceptTypes'

import { BenchmarkEvaluation } from './benchmarkEvaluationDataType'

export enum BenchmarkingSessionStatus {
  CREATED = 'created',
  RUNNING = 'running',
  INTERMEDIATE = 'intermediate',
  FINISHED = 'finished',
}

export type BenchmarkingSession = BaseConcept & {
  status: BenchmarkingSessionStatus
  caseSet: string
  aiImplementations: Array<string>
  results: Loadable<BenchmarkEvaluation>
}
