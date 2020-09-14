import { CardActions, TableCell } from '@material-ui/core';
import styled from 'styled-components';

export const SecondaryTextInCell = styled.div`
  color: ${({ theme }): string => theme.palette.text.secondary};
`;

export const CenteredTableCell = styled(TableCell)`
  text-align: center;
`;

export const ButtonsTableCell = styled(TableCell)`
  padding-left: 0;
  //padding-right: 0;
`;

export const CardActionsEnd = styled(CardActions)`
  justify-content: flex-end;
`;
