/* eslint-disable import/prefer-default-export */
import { Loadable } from '../util/dataState/dataStateTypes'

import { BenchmarkEvaluation } from './benchmarkEvaluationDataType'

export enum BenchmarkingSessionStatus {
  CREATED = 'created',
  RUNNING = 'running',
  INTERMEDIATE = 'intermediate',
  FINISHED = 'finished',
}

export type BenchmarkingSession = {
  id: string
  status: BenchmarkingSessionStatus
  caseSet: string
  aiImplementations: Array<string>
  results: Loadable<BenchmarkEvaluation>
}
