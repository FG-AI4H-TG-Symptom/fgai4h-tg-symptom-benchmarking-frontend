export enum BenchmarkResultStatusNames {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}
export const BenchmarkResultStatusMap = {
  0: BenchmarkResultStatusNames.PENDING,
  1: BenchmarkResultStatusNames.COMPLETED,
  '-1': BenchmarkResultStatusNames.FAILED,
}
export type BenchmarkResultStatus = keyof typeof BenchmarkResultStatusMap

/* eslint-disable camelcase */
export interface BenchmarkInfo {
  logs: string[]
  current_case_index: number
  total_cases: number
  ai_reports: {
    [toyAiName: string]: Array<{
      case_status: BenchmarkResultStatus
      errors: number
      health_checks: 1
      healthcheck_status: number
      timeouts: number
    }>
  }
}
/* eslint-enable camelcase */
