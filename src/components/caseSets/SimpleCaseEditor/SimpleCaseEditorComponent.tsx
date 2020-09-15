import React, { useState, useMemo, useEffect, useRef, Fragment } from "react";
import styled from "styled-components";
import { v1 as uuid } from "uuid";

import {
  useForm,
  Controller,
  useFieldArray,
  useFormContext,
  FormContext,
} from "react-hook-form";
import { Delete as DeleteIcon } from "@material-ui/icons";

import {
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Typography,
  IconButton,
  makeStyles,
  Input,
  Chip,
} from "@material-ui/core";

import berlinModelSchema from "../../../data/caseSets/berlinModel.schema.json";
import { refToConcept } from "../CaseEditor/utils";

const FormBlockContainer = styled.div<{ color: string }>`
  border-left: 2px solid ${({ color }): string => color};
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: ${1}rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const FormBlockTitle = styled.div<{ color: string }>`
  color: ${({ color }): string => color};
  text-transform: uppercase;
  margin-bottom: 0.1rem;
`;

const FormBlockFlexChildren = styled.div`
  display: flex;
  align-items: flex-start;
`;

const FormBlock: React.FC<any> = ({ color, title, children }) => {
  return (
    <>
      <FormBlockTitle color={color}>{title}</FormBlockTitle>
      <FormBlockContainer color={color}>
        {/* <FormBlockFlexChildren>{children}</FormBlockFlexChildren> */}
        {children}
      </FormBlockContainer>
    </>
  );
};

const getPossibleAttributes = (clinicalFindingId) => {
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

const ReactHookFormSelect: React.FC<any> = (props) => {
  const { name, label, defaultValue, options, onChange, ...restProps } = props;
  const { control } = useFormContext();
  const labelId = `${name}-label`;

  let onSelectChange = (e) => {
    console.log("defaultOnChange");
    return e[0].target.value;
  };

  if (onChange) {
    onSelectChange = (e) => {
      console.log("modified on change");
      onChange(e);
      return e[0].target.value;
    };
  }

  return (
    <FormControl {...restProps}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        onChange={onSelectChange}
        as={
          <Select labelId={labelId} label={label}>
            {options}
          </Select>
        }
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};

const AttributeSingleSelect: React.FC<any> = ({
  magicName,
  selectedAttribute,
  onAttributeChange,
  selectedValue,
  attributesOptions,
  valuesOptions,
}) => {
  console.log("SingleSelect rendered attributesOptions", attributesOptions);
  return (
    <>
      <ReactHookFormSelect
        fullWidth
        id="attribute"
        name={`${magicName}.id`}
        label="Attribute"
        options={attributesOptions}
        defaultValue={selectedAttribute}
        onChange={onAttributeChange}
      />

      {valuesOptions.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <FormBlock color={"#ffc400"} title={"Value"}>
            <ReactHookFormSelect
              fullWidth
              id="value"
              name={`${magicName}.value.id`}
              label="Value"
              options={valuesOptions}
              defaultValue={selectedValue}
            />
          </FormBlock>
        </div>
      )}
    </>
  );
};

const AttributeMultiSelect: React.FC<any> = ({
  possibleValues,
  magicName,
  selectedAttribute,
  onAttributeChange,
  selectedValue,
  attributesOptions,
  valuesOptions,
}) => {
  const { control, getValues } = useFormContext();

  const useStyles = makeStyles(() => ({
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
  }));

  const classes = useStyles();

  const renderOptions = (selected) => {
    return (
      <div className={classes.chips}>
        {selected.map((valueId) => {
          const value = possibleValues.find((val) => val.id === valueId);

          if (!value) {
            return <span key={valueId} />;
          }

          return (
            <Chip key={valueId} label={value.name} className={classes.chip} />
          );
        })}
      </div>
    );
  };

  console.log("multiselect rendered attributesOptions", attributesOptions);

  return (
    <>
      <ReactHookFormSelect
        fullWidth
        id="attribute"
        name={`${magicName}.id`}
        label="Multi-Select Attribute"
        options={attributesOptions}
        defaultValue={selectedAttribute}
        onChange={onAttributeChange}
      />

      <div style={{ marginTop: "10px" }}>
        <FormBlock color={"#ffc400"} title={"Values"}>
          <Box display="flex" key={`box-values`}>
            <FormControl fullWidth>
              <Controller
                fullWidth
                as={<Select multiple>{valuesOptions}</Select>}
                name={`${magicName}.values`}
                control={control}
                defaultValue={selectedValue || []}
                renderValue={(selected: any) => renderOptions(selected)}
              />
            </FormControl>
          </Box>
        </FormBlock>

        <Button
          onClick={() => {
            console.log("getValues", getValues());
          }}
        >
          Show values
        </Button>
      </div>
    </>
  );
};

const isMultiAttribute = (attrId) => {
  const properties = berlinModelSchema.definitions[attrId]?.properties;
  const isMulti = !!properties?.values;

  return isMulti;
};

const getPossibleValues = (attrId) => {
  const properties = berlinModelSchema.definitions[attrId]?.properties;

  const possibleValueReferences =
    properties?.value?.oneOf || properties?.values?.items.oneOf || [];

  const possibleValues = possibleValueReferences.map(({ $ref }) =>
    refToConcept($ref)
  );

  return possibleValues;
};

const getState = ({ id, value, availableAttributes }) => {
  console.log("###getState", id, value, availableAttributes);
  const isMulti = isMultiAttribute(id);
  let preselectedVal = value ? value.id : "";

  if (isMulti) {
    // TODO it seems the synthesiser only produces one value even for the multiselect
    const inputValArray = value ? [value] : [];
    const selectedValues = inputValArray.map((val) => val.id);
    preselectedVal = selectedValues;
  }

  const possibleValues = getPossibleValues(id);

  const attributesOptions = getSelectOptions(availableAttributes);
  const valuesOptions = getSelectOptions(possibleValues);
  return {
    id: id,
    isMulti: isMulti,
    preselectedVal: preselectedVal,
    possibleValues: possibleValues,
    attributesOptions: attributesOptions,
    valuesOptions: valuesOptions,
  };
};

const TheAttributeSelect: React.FC<any> = ({
  possibleValues,
  selectedValue,
  valuesOptions,
  attributeId,
  isMulti,
  attributesOptions,
  magicName,
  markAttrTaken,
  selectAttr,
}) => {
  const onAttributeChange = (e) => {
    const newAttrId = e[0].target.value;
    // HERE SET STATE OF AVALAIBLE OPTION - REMOVE FROM the list
    // markAttrTaken(newAttrId);

    const oldId = attributeId;
    const newId = newAttrId;
    selectAttr(oldId, newId);
    // {
    //   oldId: attributeId,
    //   newId: newAttrId,
    //   attributes: attributes,
    // });
  };

  if (isMulti) {
    return (
      <AttributeMultiSelect
        possibleValues={possibleValues}
        magicName={magicName}
        selectedAttribute={attributeId}
        onAttributeChange={onAttributeChange}
        selectedValue={selectedValue}
        attributesOptions={attributesOptions}
        valuesOptions={valuesOptions}
      />
    );
  }

  return (
    <AttributeSingleSelect
      magicName={magicName}
      selectedAttribute={attributeId}
      onAttributeChange={onAttributeChange}
      selectedValue={selectedValue}
      attributesOptions={attributesOptions}
      valuesOptions={valuesOptions}
    />
  );
};

const AttributeSelect: React.FC<any> = ({
  attributeId,
  attributeValue,
  availableAttributes,
  magicName,
}) => {
  const defaultState = {
    id: "default",
    isMulti: false,
    preselectedVal: "",
    possibleValues: [],
    attributesOptions: [],
    valuesOptions: [],
  };
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    const state = getState({
      id: attributeId,
      value: attributeValue,
      availableAttributes: availableAttributes,
    });

    setState(state);
  }, [availableAttributes, attributeId, attributeValue]);

  const onAttributeChange = (e) => {
    const newAttrId = e[0].target.value;
    const state = getState({
      id: newAttrId,
      value: null,
      availableAttributes: availableAttributes,
    });
    setState(state);
    // markAttrTaken(newAttrId);

    // HERE SET STATE OF AVALAIBLE OPTION - REMOVE FROM the list
  };

  // otherwise it doesn't want to rerender ¯\_(ツ)_/¯
  if (state.id === "default") {
    return <span />;
  }

  if (state.isMulti) {
    console.log(
      "inside attributeSelect availableAttributes",
      availableAttributes
    );
    console.log(
      "inside attributeSelect state.attributesOptions",
      state.attributesOptions
    );

    return (
      <AttributeMultiSelect
        possibleValues={state.possibleValues}
        magicName={magicName}
        selectedAttribute={state.id}
        onAttributeChange={onAttributeChange}
        selectedValue={state.preselectedVal}
        attributesOptions={state.attributesOptions}
        valuesOptions={state.valuesOptions}
      />
    );
  }

  return (
    <AttributeSingleSelect
      magicName={magicName}
      selectedAttribute={state.id}
      onAttributeChange={onAttributeChange}
      selectedValue={state.preselectedVal}
      attributesOptions={state.attributesOptions}
      valuesOptions={state.valuesOptions}
    />
  );
};

const refreshOptions = (attributes, possibleAttributes) => {
  console.log("refreshOptions attributes", attributes);
  console.log("refreshOptions possibleAttributes", possibleAttributes);

  const takenAttrIds = attributes.map((attr) => attr.id);
  const nonTakenAttributes = possibleAttributes.filter(
    (attr) => !takenAttrIds.includes(attr.id)
  );

  return attributes.map((attr) => {
    return { ...attr, availableOptions: [...nonTakenAttributes, attr] };
  });
};

const AttributeSection: React.FC<any> = ({ clinicalFinding, nameInObject }) => {
  const findingId = clinicalFinding.id;
  const possibleAttributes = getPossibleAttributes(findingId);

  const [attributes, setAttributes] = useState([]);

  // initial set state
  useEffect(() => {
    let preSelectedAttributes = clinicalFinding.attributes;

    if (preSelectedAttributes) {
      const preselectedAttributeIds = preSelectedAttributes.map(
        (attr) => attr.id
      );
      const nonTakenAttributes = possibleAttributes.filter(
        (attr) => !preselectedAttributeIds.includes(attr.id)
      );

      preSelectedAttributes = preSelectedAttributes.map((attr) => {
        return {
          ...attr,
          availableOptions: [...nonTakenAttributes, attr],
          fieldId: uuid(),
        };
      });
    }

    setAttributes(preSelectedAttributes);
  }, []);

  const markAttrTaken = (attrId) => {
    const takenAttrIds = attributes.map((attr) => attr.id);
    const availAttributes = possibleAttributes.filter(
      (attr) => !takenAttrIds.includes(attr.id)
    );

    const refreshedAttributes = attributes.map((attr) => {
      const refreshedOptions = availAttributes.filter(
        (opt) => opt.id !== attrId
      );

      return { ...attr, availableOptions: refreshedOptions };
    });
    console.log("mark taken refreshedAttributes", refreshedAttributes);
    setAttributes(refreshedAttributes);
  };

  const selectAttr = (oldId, newId, attributes) => {
    console.log("selectAttr", oldId, newId, attributes);
    const restAttributes = attributes.filter((attr) => attr.id !== oldId);
    let changedAttribute = attributes.find((attr) => attr.id === oldId);

    changedAttribute = { ...changedAttribute, id: newId };

    let newAttributes = [...restAttributes, changedAttribute];
    newAttributes = refreshOptions(newAttributes, possibleAttributes);

    return newAttributes;
  };

  const addAttribute = () => {
    const newAttribute = {
      id: "",
      value: { id: "" },
      // availableOptions: availAttributes,
      availableOptions: [],
      fieldId: uuid(),
    };

    let newAttributes = [...attributes, newAttribute];
    newAttributes = refreshOptions(newAttributes, possibleAttributes);

    setAttributes(newAttributes);
  };

  const removeAttribute = (fieldId) => {
    let newAttributes = [
      ...attributes.filter((attr) => attr.fieldId !== fieldId),
    ];

    newAttributes = refreshOptions(newAttributes, possibleAttributes);

    setAttributes(newAttributes);
  };

  if (!berlinModelSchema.definitions[findingId]) {
    return <Typography>Start by selecting a clinical finding</Typography>;
  }
  const { properties } = berlinModelSchema.definitions[findingId];
  if (!properties.attributes.items) {
    return <></>;
  }

  const numOfAttributes = attributes.length;
  const totalNumOfAttributes = possibleAttributes.length;

  console.log("i rendered");
  return (
    <FormBlock
      name="attributesFormBlock"
      color="#4cb8da"
      title={`Attributes ${numOfAttributes}/${totalNumOfAttributes}`}
    >
      {attributes.map((attribute, index) => {
        const attributeMagicName = `${nameInObject}.attributes[${index}]`;
        const attributeId = attribute.id;
        const attributeValue = attribute.value;
        const availableOptions = attribute.availableOptions;

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

        console.log("inside map possibleValues", possibleValues);

        return (
          <FormBlock
            name={`formBlock${index}`}
            key={attribute.fieldId}
            color="#4cb8da"
          >
            <Grid container spacing={2}>
              <Grid item xs={11}>
                <TheAttributeSelect
                  possibleValues={possibleValues}
                  selectedValue={preselectedVal}
                  valuesOptions={valuesOptions}
                  attributesOptions={attributesOptions}
                  attributeId={attributeId}
                  isMulti={isMulti}
                  magicName={attributeMagicName}
                  markAttrTaken={markAttrTaken}
                  selectAttr={(oldId, newId) => {
                    const newAttrs = selectAttr(oldId, newId, attributes);
                    setAttributes(newAttrs);
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

const MetaDataSection: React.FC<any> = ({ case_, errors }) => {
  const { register } = useFormContext();

  return (
    <Card>
      <CardHeader title={"Meta data"} />
      <CardContent>
        <TextField
          style={{ marginBottom: "10px" }}
          inputRef={register({
            required: "Name is required",
            minLength: {
              value: 6,
              message: "Name should be longer than 6 characters",
            },
          })}
          defaultValue={case_.data.metaData.name}
          name="metaData.name"
          label="Case Name"
          type="text"
          error={Boolean(errors.name)}
          helperText={errors.name && errors.name.message}
          fullWidth
        />

        <TextField
          inputRef={register({
            required: "Name is required",
            minLength: {
              value: 6,
              message: "Name should be longer than 6 characters",
            },
          })}
          defaultValue={case_.data.metaData.caseCreator}
          name="metaData.caseCreator"
          label="Case creator"
          type="text"
          error={Boolean(errors.caseCreator)}
          helperText={errors.caseCreator && errors.caseCreator.message}
          fullWidth
        />
      </CardContent>
    </Card>
  );
};

const ProfileInformationSection: React.FC<any> = ({ case_, register }) => {
  return (
    <FormBlock color="#a6a6f7" title="Profile information">
      <Grid container spacing={2}>
        <Grid item xs={3} md={2} lg={1}>
          <TextField
            inputRef={register({
              // required: "Name is required",
              // minLength: {
              //   value: 6,
              //   message: "Name should be longer than 6 characters",
              // },
            })}
            defaultValue={case_.data.caseData.profileInformation.age}
            name="caseData.profileInformation.age"
            label="Age"
            type="number"
            // error={Boolean(errors.caseCreator)}
            // helperText={errors.caseCreator && errors.caseCreator.message}
            // fullWidth
          />
        </Grid>

        <Grid item xs={6} md={3} lg={2}>
          <ReactHookFormSelect
            fullWidth
            id="biologicalSex"
            name="caseData.profileInformation.biologicalSex"
            label="Biological sex"
            options={getPlainOptions(
              berlinModelSchema.definitions.biologicalSex.enum
            )}
            defaultValue={case_.data.caseData.profileInformation.biologicalSex}
          />
        </Grid>
      </Grid>
    </FormBlock>
  );
};

const ClinicalFindingComponent: React.FC<any> = ({
  clinicalFinding,
  nameInObject,
  possibleClinicalFindings,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8} lg={3}>
        <ReactHookFormSelect
          fullWidth
          id="clinicalFinding"
          name={`${nameInObject}.id`}
          label="Clinical finding"
          options={getSelectOptions(possibleClinicalFindings)}
          defaultValue={clinicalFinding.id}
        />
      </Grid>

      <Grid item xs={12} sm={4} lg={2}>
        <Box display="flex">
          <ReactHookFormSelect
            fullWidth
            id="state"
            name={`${nameInObject}.state`}
            label="State"
            options={getPlainOptions(
              berlinModelSchema.definitions.clinicalFindingState.enum
            )}
            defaultValue={clinicalFinding.state}
          />
        </Box>
      </Grid>

      <Grid item xs={12} lg={7}>
        <AttributeSection
          clinicalFinding={clinicalFinding}
          nameInObject={nameInObject}
        />
      </Grid>
    </Grid>
  );
};

const PresentingComplaintSection: React.FC<any> = ({
  case_,
  possibleClinicalFindings,
}) => {
  const clinicalFinding = case_.data.caseData.presentingComplaints[0];

  const nameInObject = `caseData.presentingComplaints[0]`;

  return (
    <FormBlock
      name="presentingComplaints"
      color="#67c567"
      title="Presenting complaint"
    >
      <ClinicalFindingComponent
        clinicalFinding={clinicalFinding}
        nameInObject={nameInObject}
        possibleClinicalFindings={possibleClinicalFindings}
      />
    </FormBlock>
  );
};

const OtherFeaturesSection: React.FC<any> = ({
  case_,
  possibleClinicalFindings,
}) => {
  const { otherFeatures } = case_.data.caseData;
  // const nameInObject = `caseData.presentingComplaints[0]`;

  return (
    <FormBlock name="otherFeatures" color="#e491e8" title="Other Features">
      {otherFeatures.map((clinicalFinding, index) => {
        const magicName = `caseData.otherFeatures[${index}]`;

        return (
          <Fragment key={`fragment${clinicalFinding.id}`}>
            <ClinicalFindingComponent
              clinicalFinding={clinicalFinding}
              nameInObject={magicName}
              possibleClinicalFindings={possibleClinicalFindings}
            />
            <div style={{ marginBottom: "30px" }}>{"   "} </div>
          </Fragment>
        );
      })}
    </FormBlock>
  );
};

const CaseDataSection: React.FC<any> = ({
  case_,
  possibleClinicalFindings,
}) => {
  const { register } = useFormContext();

  return (
    <Card style={{ marginTop: "10px" }}>
      <CardHeader title={"Case Data"} />
      <CardContent>
        <ProfileInformationSection case_={case_} register={register} />

        <PresentingComplaintSection
          case_={case_}
          possibleClinicalFindings={possibleClinicalFindings}
        />

        {/* <OtherFeaturesSection
          case_={case_}
          possibleClinicalFindings={possibleClinicalFindings}
        /> */}
      </CardContent>
    </Card>
  );
};

const CaseEditorComponent: React.FC<any> = ({ case_ }) => {
  const possibleClinicalFindings = useMemo(
    () =>
      berlinModelSchema.definitions.clinicalFinding.oneOf.map(({ $ref }) =>
        refToConcept($ref)
      ),
    []
  );

  console.log("case_", case_);

  const methods = useForm();
  const { handleSubmit, errors } = methods;

  const onSubmit = (data) => {
    console.log("####submitted", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContext {...methods}>
        <MetaDataSection case_={case_} errors={errors} />

        <CaseDataSection
          case_={case_}
          possibleClinicalFindings={possibleClinicalFindings}
        />

        <Button type={"submit"}>Submit</Button>
      </FormContext>
    </form>
  );
};

export default CaseEditorComponent;
