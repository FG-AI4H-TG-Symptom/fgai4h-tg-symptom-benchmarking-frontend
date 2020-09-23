import React from 'react';

import { MenuItem } from '@material-ui/core';

import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json';
import { refToConcept } from '../CaseEditor/utils';

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
