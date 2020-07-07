import { BaseConcept } from "../util/baseConceptTypes";
import { Case } from "./berlinModelTypes";

export type CaseDataType = BaseConcept & {
  data: Case;
  caseSets: [string];
};
