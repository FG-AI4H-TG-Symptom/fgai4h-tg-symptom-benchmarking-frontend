import React from 'react'
import styled from 'styled-components'
import { Card, CardContent, CardHeader } from '@material-ui/core'
import { FlatErrors } from './utils'

const FormCard = styled(Card)<{ error?: boolean }>`
  ${({ error }): string => (error ? 'border-color: red;' : '')}
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`

interface FormSectionProps {
  title: string
  name: string
  errors?: FlatErrors
}
const FormSection: React.FC<FormSectionProps> = ({
  title,
  name,
  children,
  errors,
}) => (
  <FormCard
    variant='outlined'
    error={
      errors &&
      Object.entries(errors).some(([errorPath, error]) =>
        errorPath.startsWith(name),
      )
    }
  >
    <CardHeader subheader={title} />
    <CardContent>{children}</CardContent>
  </FormCard>
)

export default FormSection
