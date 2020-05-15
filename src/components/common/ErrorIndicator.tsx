import React from 'react'
import { Tooltip } from '@material-ui/core'
import { Warning as WarningIcon } from '@material-ui/icons'

const ErrorIndicator: React.FC<{ error: string }> = ({ error }) =>
  error ? (
    <Tooltip title={error}>
      <WarningIcon color='error' />
    </Tooltip>
  ) : null

export default ErrorIndicator
