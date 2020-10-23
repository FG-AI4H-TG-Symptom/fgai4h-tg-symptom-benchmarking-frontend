/* eslint-disable no-console */
import { useFormContext, Controller } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, Select } from '@material-ui/core';
import React from 'react';
import { getErrorMessage } from './utility';

const ReactHookFormSelect: React.FC<any> = (props) => {
  const { name, label, defaultValue, options, onChange, ...restProps } = props;
  const { control, errors } = useFormContext();
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

  let labelStyle = {};

  if (restProps.labelFontSize) {
    labelStyle = { ...labelStyle, fontSize: restProps.labelFontSize };
  }
  if (restProps.labelColor) {
    labelStyle = { ...labelStyle, color: restProps.labelColor };
  }

  const errorMessage = getErrorMessage(name, errors);

  return (
    <FormControl {...restProps}>
      <InputLabel id={labelId} style={labelStyle}>
        {label}
      </InputLabel>
      <Controller
        onChange={onSelectChange}
        as={
          <Select labelId={labelId} label={label}>
            {options}
          </Select>
        }
        error={!!errorMessage}
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: 'This value should not be empty' }}
      />
      <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

export default ReactHookFormSelect;
