import React from 'react';

import { MenuItem } from '@material-ui/core';

import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json';
import { BaseNamedConcept } from '../../../data/util/baseConceptTypes';

export interface ModelConst {
  const: string;
}

export interface ModelConstProperties {
  properties: {
    [propertyName: string]: ModelConst;
  };
}

export interface ConceptSelectionProps {
  possibleValues: Array<BaseNamedConcept>;
}

export const modelConstToObject = (constObject: ModelConstProperties): BaseNamedConcept => {
  const unpackedObject: Partial<BaseNamedConcept> = {};
  Object.entries(constObject.properties).forEach(([key, value]: [string, ModelConst | Record<string, unknown>]) => {
    if (!('const' in value)) {
      return;
    }
    unpackedObject[key] = value.const;
  });
  return unpackedObject as BaseNamedConcept;
};

export const extendWithModelInformationFromIds = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(extendWithModelInformationFromIds).filter((entry) => Boolean(entry));
  }
  if (typeof data === 'object') {
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
    berlinModelSchema.definitions[refOrConceptId.includes('/') ? refOrConceptId.split('/')[2] : refOrConceptId],
  );

export const getPossibleAttributes = (clinicalFindingId) => {
  return (
    berlinModelSchema.definitions[clinicalFindingId]?.properties.attributes.items?.oneOf.map(({ $ref }) =>
      refToConcept($ref),
    ) || []
  );
};

export const getPlainOptions = (options) => {
  return options.map((option) => (
    <MenuItem key={option} value={option}>
      {option}
    </MenuItem>
  ));
};

export const getSelectOptions = (possibleValues) => {
  if (!possibleValues) {
    return [];
  }

  return possibleValues.map((clinicalFinding) => (
    <MenuItem key={clinicalFinding.id} value={clinicalFinding.id}>
      {clinicalFinding.name}
    </MenuItem>
  ));
};

export const getPossibleValues = (attrId) => {
  const properties = berlinModelSchema.definitions[attrId]?.properties;

  const possibleValueReferences = properties?.value?.oneOf || properties?.values?.items.oneOf || [];

  const possibleValues = possibleValueReferences.map(({ $ref }) => refToConcept($ref));

  return possibleValues;
};

export const isMultiAttribute = (attrId) => {
  const properties = berlinModelSchema.definitions[attrId]?.properties;
  const isMulti = !!properties?.values;

  return isMulti;
};

const getCondition = (id, possibleConditions) => {
  const condition = possibleConditions.find((cond) => cond.id === id);
  return condition;
};

const transformValue = (id, possibleValues) => {
  return possibleValues.find((val) => val.id === id);
};

const transformAttributes = (attributes, possibleAttributes) => {
  return attributes.map((attribute) => {
    const templateAttr = possibleAttributes.find((attr) => attr.id === attribute.id);

    const { standardOntologyUris, name } = templateAttr;

    const attr = {
      ...attribute,
      standardOntologyUris: standardOntologyUris,
      name: name,
    };

    const possibleValues = getPossibleValues(attr.id);

    if (Array.isArray(attr.value)) {
      // for multiselect values is array of ids
      const newValue = attr.value.map((id) => transformValue(id, possibleValues));

      attr.value = newValue;
    } else if (typeof attr.value === 'string') {
      attr.value = transformValue(attr.value, possibleValues);
    }

    return attr;
  });
};

const trasformClinicalFinding = (finding, possibleClinicalFindings) => {
  const template = possibleClinicalFindings.find((finding_) => finding_.id === finding.id);

  const { standardOntologyUris, name } = template;

  const cFinding = {
    ...finding,
    standardOntologyUris: standardOntologyUris,
    name: name,
  };

  if (!cFinding.attributes) {
    cFinding.attributes = [];
  }

  const possibleAttributes = getPossibleAttributes(cFinding.id);

  cFinding.attributes = transformAttributes(cFinding.attributes, possibleAttributes);

  return cFinding;
};

export const formatCaseForBackend = (data, possibleConditions, caseSets, possibleClinicalFindings, id) => {
  const result = { id: id, data: { ...data }, caseSets: caseSets };

  const { valuesToPredict, caseData } = result.data;

  if (!valuesToPredict.impossibleConditions) {
    valuesToPredict.impossibleConditions = [];
  }

  if (!valuesToPredict.otherRelevantDifferentials) {
    valuesToPredict.otherRelevantDifferentials = [];
  }

  valuesToPredict.correctCondition = getCondition(valuesToPredict.correctCondition.id, possibleConditions);

  valuesToPredict.expectedCondition = getCondition(valuesToPredict.expectedCondition.id, possibleConditions);

  valuesToPredict.otherRelevantDifferentials = valuesToPredict.otherRelevantDifferentials.map((cond) =>
    getCondition(cond.id, possibleConditions),
  );

  valuesToPredict.impossibleConditions = valuesToPredict.impossibleConditions.map((cond) =>
    getCondition(cond.id, possibleConditions),
  );

  caseData.profileInformation.age = Number(caseData.profileInformation.age);

  caseData.presentingComplaints = caseData.presentingComplaints.map((cf) =>
    trasformClinicalFinding(cf, possibleClinicalFindings),
  );

  caseData.otherFeatures = caseData.otherFeatures.map((cf) => trasformClinicalFinding(cf, possibleClinicalFindings));

  return result;
};

export const getErrorMessage = (name, errors) => {
  const names = name.split('.');

  let result = errors;

  for (let i = 0; i < names.length; i++) {
    const aName = names[i];
    const isArray = aName.includes('[');

    if (!result) {
      return null;
    }
    if (!result[aName] && !isArray) {
      return null;
    }

    if (isArray) {
      const arrayName = aName.split('[')[0];
      let index = aName.substring(aName.lastIndexOf('[') + 1, aName.lastIndexOf(']'));
      index = Number(index);
      result = result[arrayName] ? result[arrayName][index] : null;
    } else {
      result = result[aName];
    }
  }

  return result.message;
};
