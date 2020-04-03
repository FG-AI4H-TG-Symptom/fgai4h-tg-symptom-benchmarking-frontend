import { TextField } from '@material-ui/core'
import React from 'react'

const AutoTextField = ({ name, register, type, label, errors }) => {
  return (
    <TextField
      inputRef={register}
      name={name}
      label={label}
      type={type}
      defaultValue=''
      error={Boolean(errors[name])}
      helperText={errors[name]}
    />
  )
}

export default AutoTextField
