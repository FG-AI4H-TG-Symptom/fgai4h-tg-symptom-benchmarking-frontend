import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Box } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import styled from 'styled-components'

import { errorsInChildren, errorSummary } from './utils'

const ErrorMessage = styled.div`
  font-style: italic;
`

const AllErrors: React.FC<{}> = () => {
  const { errors } = useFormContext()
  const allErrors = errorsInChildren('', errors)
  if (allErrors.length === 0) {
    return null
  }
  return (
    <Box marginBottom={2}>
      <Alert variant='outlined' severity='error'>
        The data you entered has errors
        <ErrorMessage>{errorSummary('', allErrors)}</ErrorMessage>
      </Alert>
    </Box>
  )
}

export default AllErrors
