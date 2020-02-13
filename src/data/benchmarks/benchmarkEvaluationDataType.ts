export type BenchmarkEvaluation = {
  [toyAiName: string]: Array<{
    [metricName: string]: number
  }>
}
