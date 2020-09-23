import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, CardHeader, Tooltip } from '@material-ui/core';
import { Warning as WarningIcon } from '@material-ui/icons';
import { AutoPrefix } from './PrefixContext';
import { errorSummary, useErrorsInChildren } from './utils';

// todo: should prevent the `hasErrors` prop from being passed down
const FormCard = styled(Card)<{ hasErrors?: boolean }>`
  ${({ hasErrors }): string => (hasErrors ? 'border-color: red;' : '')}
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

interface FormSectionProps {
  title: string;
  name: string;
}
const FormSection: React.FC<FormSectionProps> = ({ title, name, children }) => {
  const errors = useErrorsInChildren(name);
  const hasErrors = errors.length > 0;
  return (
    <FormCard hasErrors={hasErrors}>
      <CardHeader
        title={title}
        action={
          hasErrors ? (
            <Tooltip title={errorSummary(name, errors)}>
              <WarningIcon color="error" />
            </Tooltip>
          ) : null
        }
      />
      <CardContent>
        <AutoPrefix name={name}>{children}</AutoPrefix>
      </CardContent>
    </FormCard>
  );
};

export default FormSection;
