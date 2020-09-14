import { TableCell } from '@material-ui/core';
import styled from 'styled-components';

const TextOverflowCell = styled(TableCell)`
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
`;

export const CaseIdCell = styled(TextOverflowCell)`
  max-width: 10rem;
`;

export const CaseDescriptionCell = styled(TextOverflowCell)`
  max-width: 8rem;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;
