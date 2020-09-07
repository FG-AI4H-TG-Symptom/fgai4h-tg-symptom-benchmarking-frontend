import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button } from '@material-ui/core';

import AutoTextField from '../../forms/AutoTextField';

interface AiImplementationFormProps {
  onSubmit: (aiImplementation) => void;
  name?: string;
  baseUrl?: string;
  editing?: boolean;
}
const AiImplementationForm: React.FC<AiImplementationFormProps> = ({
  onSubmit,
  editing = false,
  name,
  baseUrl,
}) => {
  const methods = useForm<any>({
    defaultValues: {
      name: name,
      baseUrl: baseUrl,
    },
    // todo: validation based on OpenAPI schema
  });
  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    setValue('name', name);
    setValue('baseUrl', baseUrl);
  }, [name, baseUrl]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <AutoTextField name="name" type="text" label="Name" />
        <AutoTextField name="baseUrl" type="text" label="Base URL" />
        <Box display="flex" justifyContent="flex-end" marginTop={4}>
          <Button color="primary" type="submit">
            {editing ? 'Save' : 'Register'}
          </Button>
        </Box>
      </FormProvider>
    </form>
  );
};

export default AiImplementationForm;
