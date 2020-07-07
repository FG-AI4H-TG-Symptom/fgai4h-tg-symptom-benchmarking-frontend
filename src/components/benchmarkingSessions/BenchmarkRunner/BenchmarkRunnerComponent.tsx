import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";

import {
  BenchmarkResultStatus,
  BenchmarkStepError,
  RunningBenchmarkReport
} from "../../../data/benchmarks/benchmarkInfoDataType";
import { BenchmarkingSession } from "../../../data/benchmarks/benchmarkManagerDataType";

import * as Styled from "./BenchmarkRunnerComponent.style";

interface AiImplementationManagerComponentProps {
  benchmarkingSession: BenchmarkingSession;
  report: RunningBenchmarkReport;
  AIs: any;
}

const BenchmarkRunnerComponent: React.FC<AiImplementationManagerComponentProps> = ({
  benchmarkingSession,
  report,
  AIs
}) => {
  const responses = report ? report.responses : [];

  return (
    <TableContainer component={Paper}>
      <Table>
        <caption>
          {benchmarkingSession.aiImplementations.length} AI implementations,{" "}
          {responses.length} cases
        </caption>
        <TableHead>
          <Styled.GroupingTableRow>
            <TableCell />
            <TableCell />
            <TableCell />
          </Styled.GroupingTableRow>
          <TableRow>
            <TableCell>AI implementation name</TableCell>
            <TableCell>Errors</TableCell>
            <TableCell>Timeouts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {benchmarkingSession.aiImplementations.map(aiImplementationId => (
            <TableRow key={aiImplementationId}>
              <TableCell>
                {AIs.find(ai => ai.id == aiImplementationId).name}
              </TableCell>
              <TableCell>
                {
                  responses.filter(caseReport => {
                    const response = caseReport.responses[aiImplementationId];

                    return (
                      response.status === BenchmarkResultStatus.ERRORED &&
                      response.error !== BenchmarkStepError.TIMEOUT
                    );
                  }).length
                }
              </TableCell>
              <TableCell>
                {
                  responses.filter(caseReport => {
                    const response = caseReport.responses[aiImplementationId];

                    return (
                      response.status === BenchmarkResultStatus.ERRORED &&
                      response.error === BenchmarkStepError.TIMEOUT
                    );
                  }).length
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BenchmarkRunnerComponent;
