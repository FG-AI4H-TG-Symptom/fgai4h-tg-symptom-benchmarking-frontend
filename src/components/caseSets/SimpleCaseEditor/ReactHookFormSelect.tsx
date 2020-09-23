/* eslint-disable no-console */
import { useFormContext, Controller } from 'react-hook-form';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import React from 'react';

const ReactHookFormSelect: React.FC<any> = (props) => {
  const { name, label, defaultValue, options, onChange, ...restProps } = props;
  const { control } = useFormContext();
  const labelId = `${name}-label`;

  let onSelectChange = (e) => {
    console.log('defaultOnChange');
    return e[0].target.value;
  };

  if (onChange) {
    onSelectChange = (e) => {
      console.log('modified on change');
      onChange(e);
      return e[0].target.value;
    };
  }

  return (
    <FormControl {...restProps}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        onChange={onSelectChange}
        as={
          <Select labelId={labelId} label={label}>
            {options}
          </Select>
        }
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};

export default ReactHookFormSelect;
