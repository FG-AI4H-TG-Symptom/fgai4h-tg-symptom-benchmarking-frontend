import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import ViewRawFooter from '../../common/ViewRawFooter';
import * as CommonStyled from '../../common/CommonStyles';

interface AiImplementationManagerComponentProps {
  evaluation: any;
  aiImplementations: any;
  datasets: any;
}

const BenchmarkEvaluatorComponent: React.FC<AiImplementationManagerComponentProps> = ({
  evaluation,
  aiImplementations,
  datasets,
}) => {
  const datasetName = datasets.find((set) => set.id === evaluation.caseSet)?.name;
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <caption>
            {evaluation.aiImplementations.length} AI implementations, {datasetName}, {evaluation.metrics.length} metrics
          </caption>
          <TableHead>
            <TableRow>
              <TableCell>AI implementation</TableCell>
              {evaluation.metrics.map(({ id, name }) => (
                <CommonStyled.CenteredTableCell key={id}>{name}</CommonStyled.CenteredTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {evaluation.aiImplementations.map((aiImplementationId) => (
              <TableRow key={aiImplementationId}>
                <TableCell>{aiImplementations.find((ai) => ai.id === aiImplementationId)?.name}</TableCell>
                {evaluation.metrics.map(({ id, aggregatedValues }) => (
                  <CommonStyled.CenteredTableCell key={id}>
                    {`${(aggregatedValues[aiImplementationId] * 100).toFixed(2)}%`}
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
