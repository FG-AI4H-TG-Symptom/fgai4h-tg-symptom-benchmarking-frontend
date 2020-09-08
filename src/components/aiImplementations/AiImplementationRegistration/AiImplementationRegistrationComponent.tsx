import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import styled from 'styled-components';
import AiImplementationForm from '../AiImplementationForm';

const LimitedWidthCard = styled(Card)`
  max-width: 40rem;
`;

interface AiImplementationRegistrationComponentProps {
  onRegisterAiImplementation: (aiImplementation) => void;
}

const AiImplementationRegistrationComponent: React.FC<AiImplementationRegistrationComponentProps> = ({
  onRegisterAiImplementation,
}) => {
  return (
    <LimitedWidthCard>
      <CardContent>
        <AiImplementationForm onSubmit={onRegisterAiImplementation} />
      </CardContent>
    </LimitedWidthCard>
  );
};

export default AiImplementationRegistrationComponent;
