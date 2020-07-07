import { BaseConcept } from "../util/baseConceptTypes";
import { BenchmarkingSessionStatus } from "./benchmarkManagerDataType";

export type BenchmarkEvaluation = BaseConcept & {
  caseSet: string;
  aiImplementations: Array<string>;
  status: BenchmarkingSessionStatus;
  responses: Array<{
    caseId: string;
    caseIndex: number;
    responses: {
      [aiImplementationId: string]: Array<{
        // todo: types for different possible values (including errors)
      }>;
    };
  }>;
  metrics: Array<{
    id: string;
    name: string;
    values: {
      [caseId: string]: {
        [aiImplementationId: string]: number;
      };
    };
    aggregatedValues: {
      [aiImplementationId: string]: number;
    };
  }>;
};
