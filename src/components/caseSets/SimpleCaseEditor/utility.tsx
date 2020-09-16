import React from "react";

import { MenuItem } from "@material-ui/core";

import berlinModelSchema from "../../../data/caseSets/berlinModel.schema.json";
import { refToConcept } from "../CaseEditor/utils";

export const getPossibleAttributes = (clinicalFindingId) => {
  return (
    berlinModelSchema.definitions[
      clinicalFindingId
    ]?.properties.attributes.items?.oneOf.map(({ $ref }) =>
      refToConcept($ref)
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
  
    const possibleValueReferences =
      properties?.value?.oneOf || properties?.values?.items.oneOf || [];
  
    const possibleValues = possibleValueReferences.map(({ $ref }) =>
      refToConcept($ref)
    );
  
    return possibleValues;
  };



  export const isMultiAttribute = (attrId) => {
    const properties = berlinModelSchema.definitions[attrId]?.properties;
    const isMulti = !!properties?.values;
  
    return isMulti;
  };