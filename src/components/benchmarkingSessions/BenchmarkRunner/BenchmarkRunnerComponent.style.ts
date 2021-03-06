import styled from 'styled-components';
import { AccordionDetails, TableCell, TableRow } from '@material-ui/core';

export const GroupingTableRow = styled(TableRow)`
  th:empty {
    border: none;
  }
  th:not(:empty) {
    border-bottom-width: 2px;
    padding-bottom: 0.1em;
    padding-inline-start: 0.5em;
    color: #bbb;
    font-weight: bold;
    text-align: center;
  }
`;

export const CaseTableCell = styled(TableCell)`
  width: 1em;
  text-align: center;
`;

export const AccordionDetailsAsBlock = styled(AccordionDetails)`
  display: block;
`;
