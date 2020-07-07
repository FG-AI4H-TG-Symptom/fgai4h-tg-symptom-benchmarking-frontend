import { BenchmarkingSessionStatus } from "./benchmarkManagerDataType";

export enum BenchmarkResultStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  ERRORED = "ERRORED"
}

export enum BenchmarkStepError {
  TIMEOUT = "TIMEOUT",
  SERVER_ERROR = "SERVER_ERROR",
  BAD_RESPONSE = "BAD_RESPONSE"
}

export type BenchmarkStepResponse<ResponseType> =
  | {
      status: BenchmarkResultStatus.PENDING;
    }
  | { status: BenchmarkResultStatus.ERRORED; error: BenchmarkStepError }
  | { status: BenchmarkResultStatus.COMPLETED; value: ResponseType };

export type RunningBenchmarkStepResponse = BenchmarkStepResponse<void>;

export type RunningBenchmarkStep = {
  caseId: string;
  caseIndex: number;
  responses: {
    [aiImplementationId: string]: RunningBenchmarkStepResponse;
  };
};

export type RunningBenchmarkReport = {
  status: BenchmarkingSessionStatus;
  statistics: {
    currentCaseIndex: number;
    totalCaseCount: number;
  };
  responses: Array<RunningBenchmarkStep>;
};
