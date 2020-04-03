import { FormControl, InputLabel, Select } from '@material-ui/core'
import { Controller } from 'react-hook-form'
import React from 'react'

const AutoSelect = ({ control, name, prefix, errors, label, children }) => {
  let labelId = `${label}__label`
  if (prefix) {
    labelId = `${prefix}__${labelId}`
  }
  return (
    <FormControl fullWidth error={Boolean(errors[name])}>
      <InputLabel id={labelId}>Biological sex</InputLabel>
      <Controller
        defaultValue=''
        control={control}
        name={name}
        labelId={labelId}
        as={<Select>{children}</Select>}
      />
    </FormControl>
  )
}

export default AutoSelect
