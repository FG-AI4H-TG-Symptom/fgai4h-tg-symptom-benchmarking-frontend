import { BaseConcept } from '../util/baseConceptTypes'
import { BenchmarkingSessionStatus } from './benchmarkManagerDataType'

export type BenchmarkEvaluation = BaseConcept & {
  caseSet: string
  aiImplementations: Array<string>
  status: BenchmarkingSessionStatus
  responses: Array<{
    caseId: string
    caseIndex: number
    responses: {
      [aiImplementationId: string]: Array<{
        [metricName: string]: {
          // todo
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          value: any
          // ...
        }
      }>
    }
  }>
  aggregatedMetrics: {
    [metricId: string]: {
      id: string
      name: string
      values: {
        [aiImplementationId: string]: number
      }
    }
  }
}
