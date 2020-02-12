import React from 'react'
import { FieldError } from 'react-hook-form'
import { Tooltip } from '@material-ui/core'
import { Warning as WarningIcon } from '@material-ui/icons'

const ErrorIndicator: React.FC<{ error: FieldError }> = ({ error }) =>
  error ? (
    <Tooltip title={error}>
      <WarningIcon color='error' />
    </Tooltip>
  ) : null

export default ErrorIndicator
