import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';

import * as CommonStyled from '../../common/CommonStyles';
import ViewRawFooter from '../../common/ViewRawFooter';

interface AiImplementationManagerComponentProps {
  evaluation: any;
  aiImplementations: any;
}

const BenchmarkEvaluatorComponent: React.FC<AiImplementationManagerComponentProps> = ({
  evaluation,
  aiImplementations,
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <caption>
            {evaluation.aiImplementations.length} AI implementations, {evaluation.responses.length} cases,{' '}
            {evaluation.metrics.length} metrics
          </caption>
          <TableHead>
            <TableRow>
              <TableCell>AI implementation name</TableCell>
              {evaluation.metrics.map(({ id, name }) => (
                <CommonStyled.CenteredTableCell key={id}>{name}</CommonStyled.CenteredTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {evaluation.aiImplementations.map((aiImplementationId) => (
              <TableRow key={aiImplementationId}>
                <TableCell>{aiImplementations.find((ai) => ai.id === aiImplementationId).name}</TableCell>
                {evaluation.metrics.map(({ id, aggregatedValues }) => (
                  <CommonStyled.CenteredTableCell key={id}>
                    {Math.round(aggregatedValues[aiImplementationId] * 100) / 100}
                  </CommonStyled.CenteredTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ViewRawFooter data={evaluation} ariaPrefix="evaluation-source" />
    </>
  );
};

export default BenchmarkEvaluatorComponent;
