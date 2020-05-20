import berlinModelSchema from '../../../../data/caseSets/berlinModel.schema.json'
import { BaseNamedConcept } from '../../../../data/util/baseConceptTypes'

export interface ModelConstProperties {
  properties: {
    [propertyName: string]: ModelConst
  }
}

export interface ModelConst {
  const: string
}

export type Concept = BaseNamedConcept & {
  sctid?: string
}

export const modelConstToObject = (
  constObject: ModelConstProperties,
): Concept => {
  const unpackedObject: Partial<Concept> = {}
  Object.entries(constObject.properties).forEach(
    ([key, value]: [string, ModelConst | object]) => {
      if (!('const' in value)) {
        return
      }
      unpackedObject[key] = value.const
    },
  )
  return unpackedObject as Concept
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extendWithModelInformationFromIds = (data: any): any => {
  if (Array.isArray(data)) {
    return data
      .map(extendWithModelInformationFromIds)
      .filter(entry => Boolean(entry))
  }
  if (typeof data === 'object') {
    let extendedData = {}
    if (data.id) {
      const definition = berlinModelSchema.definitions[data.id]
      if (!definition) {
        throw Error(`[Schema] No definition for '${data.id}'`)
      }

      extendedData = { ...modelConstToObject(definition) }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.entries(data).forEach(([key, value]: [string, any]) => {
      extendedData[key] = extendWithModelInformationFromIds(value)
    })

    return extendedData
  }
  return data
}

export const refToConcept = (refOrConceptId: string): Concept =>
  modelConstToObject(
    berlinModelSchema.definitions[
      refOrConceptId.includes('/')
        ? refOrConceptId.split('/')[2]
        : refOrConceptId
    ],
  )
