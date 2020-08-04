export enum BenchmarkResultStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  ERRORED = "ERRORED",
}

export enum BenchmarkStepError {
  TIMEOUT = "TIMEOUT",
  SERVER_ERROR = "SERVER_ERROR",
  BAD_RESPONSE = "BAD_RESPONSE",
}
