import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, Select } from '@material-ui/core';

import { usePrefix } from './PrefixContext';
import { sanitizeForId } from './utils';

const AutoSelect: React.FC<{
  name: string;
  label: string;
  onChange?: (events: [{ target: { value: string } }]) => string;
}> = ({ name, label, onChange, children }) => {
  const prefixedName = usePrefix() + name;
  const {
    control,
    watch,
    formState: { isSubmitted },
  } = useFormContext();
  const hasErrors = isSubmitted && !watch(prefixedName);

  const labelId = `${sanitizeForId(prefixedName)}__label`;
  const helperTextId = `${sanitizeForId(prefixedName)}__helper`;
  return (
    <FormControl fullWidth error={hasErrors}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        defaultValue=""
        control={control}
        name={prefixedName}
        labelId={labelId}
        aria-describedby={helperTextId}
        onChange={onChange}
        as={<Select>{children}</Select>}
      />
      <FormHelperText id={helperTextId}>{hasErrors ? `select ${label.toLowerCase()}` : null}</FormHelperText>
    </FormControl>
  );
};

export default AutoSelect;
