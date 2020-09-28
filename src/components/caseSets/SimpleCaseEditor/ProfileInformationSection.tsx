import React from 'react';

import { useFormContext } from 'react-hook-form';
import { Grid, TextField } from '@material-ui/core';

import { FormBlock } from './FormElements';

import ReactHookFormSelect from './ReactHookFormSelect';
import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json';
import { getPlainOptions } from './utility';

const ProfileInformationSection: React.FC<any> = ({ case_ }) => {
  const { register, errors } = useFormContext();

  return (
    <FormBlock color="#a6a6f7" title="Profile information">
      <Grid container spacing={2}>
        <Grid item xs={3} md={2} lg={1}>
          <TextField
            inputRef={register({
              required: 'This field is required',
            })}
            defaultValue={case_?.data?.caseData?.profileInformation?.age || ''}
            name="caseData.profileInformation.age"
            label="Age"
            type="number"
            error={!!errors?.caseData?.profileInformation?.age}
            helperText={errors?.caseData?.profileInformation?.age?.message}
          />
        </Grid>

        <Grid item xs={6} md={3} lg={2}>
          <ReactHookFormSelect
            fullWidth
            id="biologicalSex"
            name="caseData.profileInformation.biologicalSex"
            label="Biological sex"
            options={getPlainOptions(berlinModelSchema.definitions.biologicalSex.enum)}
            defaultValue={case_?.data?.caseData?.profileInformation?.biologicalSex || ''}
          />
        </Grid>
      </Grid>
    </FormBlock>
  );
};

export default ProfileInformationSection;
