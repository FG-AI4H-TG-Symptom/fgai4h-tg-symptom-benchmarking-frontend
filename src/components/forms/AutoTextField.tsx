import { TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { usePrefix } from './PrefixContext';

interface AutoTextFieldProps {
  name: string;
  type: 'text' | 'number' | 'hidden';
  label: string;
  autoComplete?: 'off';
  optional?: boolean;
}

const AutoTextField: React.FC<AutoTextFieldProps> = ({ name, type, label, autoComplete, optional }) => {
  const { register, errors, control } = useFormContext();
  const prefixedName = usePrefix() + name;
  return (
    <Controller
      as={
        <TextField
          inputRef={register}
          name={prefixedName}
          label={label}
          type={type}
          autoComplete={autoComplete}
          error={Boolean(errors[prefixedName])}
          helperText={errors[prefixedName] || (optional ? 'optional' : '')}
          fullWidth
        />
      }
      control={control}
      name={prefixedName}
      defaultValue=""
    />
  );
};

export default AutoTextField;
