/* eslint-disable import/prefer-default-export */
import { Card } from '@material-ui/core';
import styled from 'styled-components';

export const ErroredCard = styled(Card)`
  background-color: darkred;
  color: #eee;

  .MuiButton-label {
    color: white;
  }
`;
