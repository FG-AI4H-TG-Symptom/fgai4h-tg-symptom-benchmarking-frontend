import { Card, CardHeader, CardContent, TextField } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const caseCreatorValidation = {
  required: 'Creator Name is required',
  minLength: {
    value: 6,
    message: 'Creator Name should at least 6 characters',
  },
};

const MetaDataSection: React.FC<any> = ({ case_ }) => {
  const { register, errors } = useFormContext();

  return (
    <Card>
      <CardHeader title={'Meta data'} />
      <CardContent>
        <TextField
          style={{ marginBottom: '10px' }}
          inputRef={register()}
          defaultValue={case_?.data?.metaData?.name || ''}
          name="metaData.name"
          label="Case Name"
          type="text"
          error={Boolean(errors.metaData?.name)}
          helperText={errors.metaData?.name && errors.metaData.name.message}
          fullWidth
        />

        <TextField
          inputRef={register(caseCreatorValidation)}
          defaultValue={case_?.data?.metaData?.caseCreator || ''}
          name="metaData.caseCreator"
          label="Case creator"
          type="text"
          error={Boolean(errors.metaData?.caseCreator)}
          helperText={errors.metaData?.caseCreator && errors.metaData.caseCreator.message}
          fullWidth
        />
      </CardContent>
    </Card>
  );
};

export default MetaDataSection;
