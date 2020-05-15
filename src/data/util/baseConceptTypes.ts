export interface BaseConcept {
  id: string
}

export type BaseNamedConcept = BaseConcept & { name: string }
