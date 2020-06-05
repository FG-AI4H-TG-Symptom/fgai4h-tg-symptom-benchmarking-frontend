import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextField } from '@material-ui/core'

import { usePrefix } from './PrefixContext'

interface AutoTextFieldProps {
  name: string
  type: 'text' | 'number' | 'hidden'
  label: string
  autoComplete?: 'off'
  optional?: boolean
}

const AutoTextField: React.FC<AutoTextFieldProps> = ({
  name,
  type,
  label,
  autoComplete,
  optional,
}) => {
  const { register, errors } = useFormContext()
  const prefixedName = usePrefix() + name
  return (
    <TextField
      inputRef={register}
      name={prefixedName}
      label={label}
      type={type}
      autoComplete={autoComplete}
      defaultValue=''
      error={Boolean(errors[prefixedName])}
      helperText={errors[prefixedName] || (optional ? 'optional' : '')}
      fullWidth
    />
  )
}

export default AutoTextField
