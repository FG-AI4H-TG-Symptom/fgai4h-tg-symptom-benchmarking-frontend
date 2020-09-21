import React, { useEffect, useState } from "react";
import { v1 as uuid } from "uuid";

import { Button, Grid, IconButton } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

import {
  getPossibleAttributes,
  getSelectOptions,
  getPossibleValues,
  isMultiAttribute,
} from "./utility";

import berlinModelSchema from "../../../data/caseSets/berlinModel.schema.json";
import { FormBlock } from "./FormElements";
import AttributeSelect from "./AttributeSelect";

const selectAttr = (newId, state, fieldId, possibleAttributes) => {
  const { attributes } = state;

  let newlyChosenAttribute = possibleAttributes.find(
    (attr) => attr.id === newId
  );

  const restAttributes = attributes.filter((attr) => attr.fieldId !== fieldId);

  newlyChosenAttribute = {
    ...newlyChosenAttribute,
    value: "",
    fieldId: fieldId,
  };

  const newAttributes = [...restAttributes, newlyChosenAttribute];

  const takenAttrIds = newAttributes.map((attr) => attr.id);

  const newAvailableAttributes = possibleAttributes.filter(
    (attr) => !takenAttrIds.includes(attr.id)
  );

  const result = {
    attributes: newAttributes,
    availableAttributes: newAvailableAttributes,
  };

  return result;
};

const getNonTakenAtributes = (state, possibleAttributes) => {
  const preselectedAttributeIds = state.attributes.map((attr) => attr.id);
  const nonTakenAttributes = possibleAttributes.filter(
    (attr) => !preselectedAttributeIds.includes(attr.id)
  );

  return nonTakenAttributes;
};

const AttributeSection: React.FC<any> = ({ clinicalFinding, nameInObject }) => {

  const findingId = clinicalFinding.id;

  const possibleAttributes = getPossibleAttributes(findingId);

  const [state, setState] = useState({
    attributes: [],
    availableAttributes: [],
  });

  // initial set state
  useEffect(() => {
    let preSelectedAttributes = clinicalFinding.attributes;

    if (!preSelectedAttributes) {
      preSelectedAttributes = [];
    }

    const preselectedAttributeIds = preSelectedAttributes.map(
      (attr) => attr.id
    );

    const nonTakenAttributes = possibleAttributes.filter(
      (attr) => !preselectedAttributeIds.includes(attr.id)
    );

    preSelectedAttributes = preSelectedAttributes.map((attr) => {
      return {
        ...attr,
        fieldId: uuid(),
      };
    });

    setState({
      availableAttributes: nonTakenAttributes,
      attributes: preSelectedAttributes,
    });
  }, [clinicalFinding.id]);

  const addAttribute = () => {
    const newAttribute = {
      id: "",
      value: "",
      fieldId: uuid(),
    };

    const newAttributes = [...state.attributes, newAttribute];

    setState({ ...state, attributes: newAttributes });
  };

  const removeAttribute = (fieldId) => {
    const newAttributes = [
      ...state.attributes.filter((attr) => attr.fieldId !== fieldId),
    ];

    const removedAttribute = state.attributes.find(
      (attr) => attr.fieldId === fieldId
    );

    let newAvailableAttributes = [...state.availableAttributes];
    if (removedAttribute.id !== "") {
      newAvailableAttributes = [...state.availableAttributes, removedAttribute];
    }

    setState({
      ...state,
      attributes: newAttributes,
      availableAttributes: newAvailableAttributes,
    });
  };

  if (!berlinModelSchema.definitions[findingId]) {
    return <></>;
    // return <Typography>Start by selecting a clinical finding</Typography>;
  }
  const { properties } = berlinModelSchema.definitions[findingId];
  if (!properties.attributes.items) {
    return <></>;
  }

  const numOfAttributes = state.attributes.length;
  const totalNumOfAttributes = possibleAttributes.length;

  return (
    <FormBlock
      name="attributesFormBlock"
      color="#4cb8da"
      title={`Attributes ${numOfAttributes}/${totalNumOfAttributes}`}
    >
      {state.attributes.map((attribute, index) => {
        const attributeMagicName = `${nameInObject}.attributes[${index}]`;
        const attributeId = attribute.id;
        const attributeValue = attribute.value;

        let availableOptions = [...state.availableAttributes];

        if (attribute.id !== "") {
          availableOptions = [...state.availableAttributes, attribute];
        }

        const isMulti = isMultiAttribute(attributeId);

        let preselectedVal = attributeValue ? attributeValue.id : "";

        if (isMulti) {
          // TODO it seems the synthesiser only produces one value even for the multiselect
          const inputValArray = attributeValue ? [attributeValue] : [];
          const selectedValues = inputValArray.map((val) => val.id);
          preselectedVal = selectedValues;
        }

        const possibleValues = getPossibleValues(attributeId);
        const attributesOptions = getSelectOptions(availableOptions);
        const valuesOptions = getSelectOptions(possibleValues);

        return (
          <FormBlock
            name={`formBlock${index}`}
            key={attribute.fieldId}
            color="#4cb8da"
          >
            <Grid container spacing={2}>
              <Grid item xs={11}>
                <AttributeSelect
                  possibleValues={possibleValues}
                  selectedValue={preselectedVal}
                  valuesOptions={valuesOptions}
                  attributesOptions={attributesOptions}
                  attributeId={attributeId}
                  isMulti={isMulti}
                  magicName={attributeMagicName}
                  selectAttr={(newId) => {
                    const newState = selectAttr(
                      newId,
                      state,
                      attribute.fieldId,
                      possibleAttributes
                    );
                    console.log("newState", newState);
                    setState({ ...newState });
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  onClick={() => {
                    removeAttribute(attribute.fieldId);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </FormBlock>
        );
      })}

      <Button
        onClick={() => {
          addAttribute();
        }}
        disabled={numOfAttributes >= totalNumOfAttributes}
      >
        Add Attribute
      </Button>
    </FormBlock>
  );
};

export default AttributeSection;
