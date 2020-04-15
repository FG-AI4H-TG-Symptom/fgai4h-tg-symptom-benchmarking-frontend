import { useFieldArray, useFormContext, FieldErrors } from 'react-hook-form'
import { usePrefix } from './PrefixContext'
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

export const useWatch = <WatchedValueType>(path: string): WatchedValueType => {
  const { watch } = useFormContext()
  const prefixedPath = usePrefix() + path
  return watch(prefixedPath)
}

export const useWatchArrayHelper = <WatchedType>(
  fieldArray: { fields: Array<object> },
  path: string,
): Array<WatchedType> => {
  const { watch } = useFormContext()
  const prefixedPath = usePrefix() + path
  const fieldNames = fieldArray.fields.map((value, index) =>
    prefixedPath.replace('*', index.toString()),
  )
  const watchResultObject = watch(fieldNames)
  return fieldNames.map(name => watchResultObject[name]) as Array<WatchedType>
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAutoFieldArray = ({
  name,
  key,
}: {
  name: string
  key?: string
}) =>
  useFieldArray({
    control: useFormContext().control,
    name: usePrefix() + name,
    keyName: key || 'key',
  })

export const errorsInChildren = <FormValuesType>(
  name: string,
  errors: FieldErrors<FormValuesType> | undefined,
): [string, string][] =>
  (errors &&
    (Object.entries(errors) as [string, string][]).filter(([errorPath]) =>
      errorPath.startsWith(name),
    )) ||
  []

export const useErrorsInChildren = (name?: string): [string, string][] => {
  const { errors } = useFormContext()
  const prefixedName = (usePrefix() + name).replace(/\.$/, '')
  return errorsInChildren(prefixedName, errors)
}

export const errorSummary = (
  name: string,
  errors: [string, string][],
): string => {
  if (errors.length > 0) {
    let errorSummaryString = errors[0][1]

    let errorPath = errors[0][0]
    if (errorPath.includes(name)) {
      errorPath = errorPath.substring(errorPath.indexOf(name) + name.length)
    }
    errorPath = errorPath.replace(/^\./, '').replace(/\./g, ' › ')
    if (errorPath.length > 0) {
      errorSummaryString = `${errorPath}: ${errorSummaryString}`
    }

    if (errors.length > 1) {
      errorSummaryString += ` (+ ${errors.length - 1} error${
        errors.length > 2 ? 's' : ''
      })`
    }
    return errorSummaryString
  }
  return 'No errors'
}

export const sanitizeForId = (prefix: string): string =>
  prefix.replace(/[.[\]'"]/g, '')
