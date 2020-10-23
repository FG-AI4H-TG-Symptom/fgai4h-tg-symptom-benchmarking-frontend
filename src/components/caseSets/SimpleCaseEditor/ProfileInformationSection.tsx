import React from 'react';

import { useFormContext } from 'react-hook-form';
import { Grid, TextField } from '@material-ui/core';

import ReactHookFormSelect from './ReactHookFormSelect';
import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json';
import { getPlainOptions } from './utility';

const ProfileInformationSection: React.FC<any> = ({ case_ }) => {
  const { register, errors } = useFormContext();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          inputRef={register({
            required: 'This field is required',
          })}
          InputLabelProps={{
            style: { color: '#1de9b6', fontSize: 20 },
          }}
          defaultValue={case_?.data?.caseData?.profileInformation?.age || ''}
          name="caseData.profileInformation.age"
          label="Age"
          type="number"
          error={!!errors?.caseData?.profileInformation?.age}
          helperText={errors?.caseData?.profileInformation?.age?.message}
        />
      </Grid>

      <Grid item xs={6}>
        <ReactHookFormSelect
          labelColor={'#1de9b6'}
          labelFontSize={20}
          fullWidth
          id="biologicalSex"
          name="caseData.profileInformation.biologicalSex"
          label="Biological sex"
          options={getPlainOptions(berlinModelSchema.definitions.biologicalSex.enum)}
          defaultValue={case_?.data?.caseData?.profileInformation?.biologicalSex || ''}
        />
      </Grid>
    </Grid>
  );
};

export default ProfileInformationSection;
