import { Grid, Box } from "@material-ui/core";
import React from "react";
import AttributeSection from "./AttributeSection";
import ReactHookFormSelect from "./ReactHookFormSelect";
import { getSelectOptions, getPlainOptions } from "./utility";
import berlinModelSchema from "../../../data/caseSets/berlinModel.schema.json";

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

export default ClinicalFindingComponent;
