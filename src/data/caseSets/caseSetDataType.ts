import { BaseNamedConcept } from '../util/baseConceptTypes'
import { CaseDataType } from './caseDataType'

export type CaseSetInfo = BaseNamedConcept & {
  cases: Array<CaseDataType>
}
