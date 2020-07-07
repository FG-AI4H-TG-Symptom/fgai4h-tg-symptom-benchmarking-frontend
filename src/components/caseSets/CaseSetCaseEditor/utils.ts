import berlinModelSchema from "../../../data/caseSets/berlinModel.schema.json";
import { BaseNamedConcept } from "../../../data/util/baseConceptTypes";

export interface ModelConstProperties {
  properties: {
    [propertyName: string]: ModelConst;
  };
}

export interface ModelConst {
  const: string;
}

export interface ConceptSelectionProps {
  possibleValues: Array<BaseNamedConcept>;
}

export const modelConstToObject = (
  constObject: ModelConstProperties
): BaseNamedConcept => {
  const unpackedObject: Partial<BaseNamedConcept> = {};
  Object.entries(constObject.properties).forEach(
    ([key, value]: [string, ModelConst | object]) => {
      if (!("const" in value)) {
        return;
      }
      unpackedObject[key] = value.const;
    }
  );
  return unpackedObject as BaseNamedConcept;
};

export const extendWithModelInformationFromIds = (data: any): any => {
  if (Array.isArray(data)) {
    return data
      .map(extendWithModelInformationFromIds)
      .filter(entry => Boolean(entry));
  }
  if (typeof data === "object") {
    let extendedData = {};
    if (data.id) {
      const definition = berlinModelSchema.definitions[data.id];
      if (!definition) {
        throw Error(`[Schema] No definition for '${data.id}'`);
      }

      extendedData = { ...modelConstToObject(definition) };
    }

    Object.entries(data).forEach(([key, value]: [string, any]) => {
      extendedData[key] = extendWithModelInformationFromIds(value);
    });

    return extendedData;
  }
  return data;
};

export const refToConcept = (refOrConceptId: string): BaseNamedConcept =>
  modelConstToObject(
    berlinModelSchema.definitions[
      refOrConceptId.includes("/")
        ? refOrConceptId.split("/")[2]
        : refOrConceptId
    ]
  );
