import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button } from '@material-ui/core';
import * as yup from 'yup';

import TextField from '@material-ui/core/TextField';
import { yupResolver } from '@hookform/resolvers';
import { paths } from '../../../routes';
import LinkWrapper from '../../common/LinkWrapper';

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

  const { control, handleSubmit, errors, setValue } = useForm<any>({
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
      <Controller
        as={
          <TextField
            type="text"
            label="Name"
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
        }
        control={control}
        name="name"
      />
      <Box m={4} />
      <Controller
        as={
          <TextField
            type="text"
            label="Base URL"
            fullWidth
            error={Boolean(errors.baseUrl)}
            helperText={errors.baseUrl?.message}
          />
        }
        control={control}
        name="baseUrl"
      />
      <Box display="flex" justifyContent="flex-end" marginTop={4}>
        <LinkWrapper to={paths.aiImplementationManager()}>
          <Button color="primary" type="submit">
            {'Cancel'}
          </Button>
        </LinkWrapper>
        <Button color="primary" type="submit">
          {editing ? 'Save' : 'Register'}
        </Button>
      </Box>
    </form>
  );
};

export default AiImplementationForm;
