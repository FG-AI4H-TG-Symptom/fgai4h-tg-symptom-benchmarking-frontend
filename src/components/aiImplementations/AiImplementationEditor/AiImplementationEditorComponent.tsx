import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import styled from 'styled-components';
import AiImplementationForm from '../AiImplementationForm';

const LimitedWidthCard = styled(Card)`
  max-width: 40rem;
`;

interface AiImplementationEditorComponentProps {
  onSaveAiImplementation: (aiImplementation) => void;
  name: string;
  baseUrl: string;
}

const AiImplementationEditorComponent: React.FC<AiImplementationEditorComponentProps> = ({
  onSaveAiImplementation,
  name,
  baseUrl,
}) => {
  return (
    <LimitedWidthCard>
      <CardContent>
        <AiImplementationForm onSubmit={onSaveAiImplementation} editing name={name} baseUrl={baseUrl} />
      </CardContent>
    </LimitedWidthCard>
  );
};

export default AiImplementationEditorComponent;
