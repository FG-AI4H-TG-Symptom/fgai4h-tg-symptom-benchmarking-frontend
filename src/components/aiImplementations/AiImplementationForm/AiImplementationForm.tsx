import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@material-ui/core';
import * as yup from 'yup';

import TextField from '@material-ui/core/TextField';
import { yupResolver } from '@hookform/resolvers';

interface AiImplementationFormProps {
  onSubmit: (aiImplementation) => void;
  name?: string;
  baseUrl?: string;
  editing?: boolean;
}

const AiImplementationForm: React.FC<AiImplementationFormProps> = ({ onSubmit, editing = false, name, baseUrl }) => {
  const aiImplementationSchema = yup.object().shape({
    name: yup.string().label('Name').min(3).required(),
    baseUrl: yup.string().label('Base URL').url().required(),
  });

  const { register, handleSubmit, errors, setValue } = useForm<any>({
    defaultValues: {
      name: name,
      baseUrl: baseUrl,
    },
    resolver: yupResolver(aiImplementationSchema),
  });

  useEffect(() => {
    setValue('name', name);
    setValue('baseUrl', baseUrl);
  }, [name, baseUrl]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        inputRef={register}
        name="name"
        type="text"
        label="Name"
        fullWidth
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
      />
      <Box m={4} />
      <TextField
        inputRef={register}
        name="baseUrl"
        type="text"
        label="Base URL"
        fullWidth
        error={Boolean(errors.baseUrl)}
        helperText={errors.baseUrl?.message}
      />
      <Box display="flex" justifyContent="flex-end" marginTop={4}>
        <Button color="primary" type="submit">
          {editing ? 'Save' : 'Register'}
        </Button>
      </Box>
    </form>
  );
};

export default AiImplementationForm;
