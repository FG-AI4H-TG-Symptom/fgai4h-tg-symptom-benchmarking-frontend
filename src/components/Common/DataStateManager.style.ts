/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'
import { Card } from '@material-ui/core'

export const ErroredCard = styled(Card)`
  background-color: darkred;
  color: #eee;

  .MuiButton-label {
    color: white;
  }
`
