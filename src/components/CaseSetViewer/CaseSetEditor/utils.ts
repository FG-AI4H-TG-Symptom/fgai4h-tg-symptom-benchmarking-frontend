import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json'

export interface ModelConstProperties {
  properties: {
    [propertyName: string]: ModelConst
  }
}

export interface ModelConst {
  const: string
}

export interface Concept {
  id: string
  name: string
  sctid?: string
}

export const modelConstToObject = (
  constObject: ModelConstProperties,
): Concept => {
  const unpackedObject: Partial<Concept> = {}
  Object.entries(constObject.properties).forEach(
    ([key, value]: [string, ModelConst | any]) => {
      if (!value.const) {
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
    return data.map(extendWithModelInformationFromIds)
  }
  if (typeof data === 'object') {
    return Object.assign(
      {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...Object.entries(data).map(([key, value]: [string, any]) => {
        if (value && value.id) {
          const concept = modelConstToObject(
            berlinModelSchema.definitions[data[key].id],
          )

          return { [key]: { ...concept, ...value } }
        }
        return { [key]: extendWithModelInformationFromIds(value) }
      }),
    )
  }
  return data
}

export const refToConcept = (ref: string): Concept =>
  modelConstToObject(berlinModelSchema.definitions[ref.split('/')[2]])

export const watchArrayHelper = (watch, fieldArray, path) => {
  const fieldNames = fieldArray.fields.map((value, index) =>
    path.replace('*', index),
  )
  const watchResultObject = watch(fieldNames)
  return fieldNames.map(name => watchResultObject[name])
}

export interface FlatErrors {
  [errorPath: string]: string
}

export const scopeErrors = (errors: FlatErrors, scope: string) => {
  const scopedErrors = {}
  Object.entries(errors).forEach(([errorPath, error]) => {
    if (errorPath.startsWith(scope)) {
      scopedErrors[errorPath.replace(scope, '').replace(/^\./, '')] = error
    }
  })
  return scopedErrors
}
