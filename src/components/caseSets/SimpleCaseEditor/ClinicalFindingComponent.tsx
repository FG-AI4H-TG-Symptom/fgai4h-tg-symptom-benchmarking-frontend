import { Grid, Box } from '@material-ui/core';
import React from 'react';
import AttributeSection from './AttributeSection';
import ReactHookFormSelect from './ReactHookFormSelect';
import { getSelectOptions, getPlainOptions } from './utility';
import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json';

const ClinicalFindingComponent: React.FC<any> = (props) => {
  const { clinicalFinding, nameInObject, possibleClinicalFindings, onClinicalFindingChange } = props;

  const onFindingChange = (e) => {
    const newId = e[0].target.value;
    if (onClinicalFindingChange) {
      onClinicalFindingChange(newId);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <ReactHookFormSelect
          fullWidth
          id="clinicalFinding"
          name={`${nameInObject}.id`}
          label="Clinical Finding Name"
          options={getSelectOptions(possibleClinicalFindings)}
          defaultValue={clinicalFinding.id}
          onChange={onFindingChange}
        />
      </Grid>

      <Grid item xs={6}>
        <Box display="flex">
          <ReactHookFormSelect
            fullWidth
            id="state"
            name={`${nameInObject}.state`}
            label="State"
            options={getPlainOptions(berlinModelSchema.definitions.clinicalFindingState.enum)}
            defaultValue={clinicalFinding.state}
          />
        </Box>
      </Grid>

      <Grid item xs={12}>
        <AttributeSection clinicalFinding={clinicalFinding} nameInObject={nameInObject} />
      </Grid>
    </Grid>
  );
};

export default ClinicalFindingComponent;
