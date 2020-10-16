import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import * as Styled from './BenchmarkRunnerComponent.style';

const BenchmarkRunnerComponent: React.FC<any> = ({ benchmarkingSession, AIs, statsTable }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <caption>{benchmarkingSession.aiImplementations.length} AI implementations</caption>
        <TableHead>
          <Styled.GroupingTableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
          </Styled.GroupingTableRow>
          <TableRow>
            <TableCell>AI implementation name</TableCell>
            <TableCell>Errors</TableCell>
            <TableCell>Completed</TableCell>
            <TableCell>Timeouts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {benchmarkingSession.aiImplementations.map((aiImplementationId) => (
            <TableRow key={aiImplementationId}>
              <TableCell>{AIs.find((ai) => ai.id === aiImplementationId)?.name}</TableCell>

              <TableCell>{statsTable[aiImplementationId].errors}</TableCell>

              <TableCell>{statsTable[aiImplementationId].completed}</TableCell>

              <TableCell>{statsTable[aiImplementationId].timeouts}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BenchmarkRunnerComponent;
