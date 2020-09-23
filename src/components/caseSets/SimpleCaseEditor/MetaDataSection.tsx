import { Card, CardHeader, CardContent, TextField } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const MetaDataSection: React.FC<any> = ({ case_, errors }) => {
  const { register } = useFormContext();

  return (
    <Card>
      <CardHeader title={'Meta data'} />
      <CardContent>
        <TextField
          style={{ marginBottom: '10px' }}
          inputRef={register({
            required: 'Name is required',
            minLength: {
              value: 6,
              message: 'Name should be longer than 6 characters',
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
            required: 'Name is required',
            minLength: {
              value: 6,
              message: 'Name should be longer than 6 characters',
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

export default MetaDataSection;
