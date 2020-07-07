import React, { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Box, Grid, Hidden, IconButton, MenuItem } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

import berlinModelSchema from "../../../data/caseSets/berlinModel.schema.json";
import { BaseNamedConcept } from "../../../data/util/baseConceptTypes";
import AutoSelect from "../../forms/AutoSelect";
import ValueSelect from "../../forms/ValueSelect";
import ValueMultiSelect from "../../forms/ValueMultiSelect";
import { usePrefix } from "../../forms/PrefixContext";
import AutoSwitchArrayEntry from "../../forms/AutoSwitchArrayEntry";
import { ArrayFormComponentProps } from "../../forms/AutoArrayFormBlock";

import { ConceptSelectionProps, refToConcept } from "./utils";

type AttributeSelectFixedProps = {
  fixedAttribute: BaseNamedConcept;
};
type AttributeSelectProps =
  | (ConceptSelectionProps & AttributeSelectFixedProps)
  | ArrayFormComponentProps;

const AttributeSelect: React.FC<AttributeSelectProps> = props => {
  const { watch, setValue } = useFormContext();
  const prefix = usePrefix();
  const [enabled, setEnabled] = useState(false);

  const attributeIdName = `${prefix}id`;
  const attributeId = watch(attributeIdName);

  const attributeProperties =
    berlinModelSchema.definitions[attributeId]?.properties;

  const possibleValueReferences =
    attributeProperties?.value?.oneOf ||
    attributeProperties?.values?.items.oneOf ||
    [];

  const dereferencedPossibleValues: Array<BaseNamedConcept> = useMemo(
    () => possibleValueReferences.map(({ $ref }) => refToConcept($ref)),
    [possibleValueReferences]
  );

  let valuesSection = null;
  // if this has no `fixedAttribute` value selection should be possible whenever
  // an attribute (id) is selected
  // if it has a fixedAttribute, dependent on the explicitly handled `enabled`
  // instead
  if (attributeId && enabled === "fixedAttribute" in props) {
    if (attributeProperties.value) {
      valuesSection = (
        <ValueSelect name="value" possibleValues={dereferencedPossibleValues} />
      );
    } else {
      valuesSection = (
        <ValueMultiSelect
          name="values"
          possibleValues={dereferencedPossibleValues}
        />
      );
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {"fixedAttribute" in props ? (
          <AutoSwitchArrayEntry
            name="id"
            label={props.fixedAttribute.name}
            valueToSet={props.fixedAttribute.id}
            onChange={setEnabled}
          />
        ) : (
          <Box display="flex">
            <AutoSelect
              name="id"
              label="Attribute"
              onChange={([event]): string => {
                // this watch should be redundant, but is somehow necessary to
                // force a re-render
                if (watch(attributeIdName)) {
                  if (attributeProperties.value) {
                    setValue(`${prefix}value`, undefined);
                  } else {
                    setValue(`${prefix}values`, []);
                  }
                }
                return event.target.value;
              }}
            >
              {props.possibleValues.map(attribute => (
                <MenuItem key={attribute.id} value={attribute.id}>
                  {attribute.name}
                </MenuItem>
              ))}
            </AutoSelect>

            <IconButton onClick={props.onRemove}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Grid>

      {/* the following hacks a 1 column offset below the md-breakpoint */}
      <Grid item xs={1} implementation="css" mdUp component={Hidden} />
      <Grid item xs={11} md={6}>
        {valuesSection}
      </Grid>
    </Grid>
  );
};

export default AttributeSelect;
