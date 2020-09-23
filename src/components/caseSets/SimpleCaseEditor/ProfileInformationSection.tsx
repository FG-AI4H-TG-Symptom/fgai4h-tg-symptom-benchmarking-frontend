import React from 'react';

import { useFormContext } from 'react-hook-form';
import { Grid, TextField } from '@material-ui/core';

import { FormBlock } from './FormElements';

import ReactHookFormSelect from './ReactHookFormSelect';
import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json';
import { getPlainOptions } from './utility';

const ProfileInformationSection: React.FC<any> = ({ case_ }) => {
  const { register } = useFormContext();

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
            options={getPlainOptions(berlinModelSchema.definitions.biologicalSex.enum)}
            defaultValue={case_.data.caseData.profileInformation.biologicalSex}
          />
        </Grid>
      </Grid>
    </FormBlock>
  );
};

export default ProfileInformationSection;
