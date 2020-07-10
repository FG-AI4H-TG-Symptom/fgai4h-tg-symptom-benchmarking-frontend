import React, { useState } from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
  PlayCircleOutline as StartBenchmarkIcon,
  ViewList as OpenIcon,
} from "@material-ui/icons";

import {
  BenchmarkingSession,
  BenchmarkingSessionStatus,
} from "../../../data/benchmarks/benchmarkManagerDataType";
import LinkWrapper from "../../common/LinkWrapper";
import { paths } from "../../../routes";

import * as Styled from "./BenchmarkingSessionManagerComponent.style";
import * as CommonStyled from "../../common/CommonStyles";
import BenchmarkingSessionStatusIcon from "./BenchmarkingSessionStatusIcon";
import ConfirmationIconButton from "../../common/ConfirmationIconButton";

const rowsPerPageOptions = [10, 20, 50, 100];

interface CaseSetManagerComponentProps {
  benchmarkingSessions: BenchmarkingSession[];
  datasets: any;
  AIs: any;
  deleteBenchmarkingSession: (benchmarkingSessionId: string) => void;
  runBenchmarkingSession: any;
}

const BenchmarkingSessionManagerComponent: React.FC<CaseSetManagerComponentProps> = ({
  benchmarkingSessions,
  datasets,
  AIs,
  deleteBenchmarkingSession,
  runBenchmarkingSession,
}) => {
  const activeRowsPerPageOptions = rowsPerPageOptions.filter(
    (rowsPerPageOption) => rowsPerPageOption <= benchmarkingSessions.length
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  return (
    <Paper>
      {benchmarkingSessions.length > rowsPerPageOptions[0] ? (
        <TablePagination
          component="div"
          count={benchmarkingSessions.length}
          page={page}
          onChangePage={(event, newPage): void => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={activeRowsPerPageOptions}
          onChangeRowsPerPage={(event): void => {
            setPage(0);
            setRowsPerPage(parseInt(event.target.value, 10));
          }}
        />
      ) : null}
      <TableContainer>
        <Table>
          <caption>{benchmarkingSessions.length} benchmarking sessions</caption>
          <TableHead>
            <TableRow>
              <TableCell>Benchmarking session ID</TableCell>

              <CommonStyled.CenteredTableCell>
                AIs
              </CommonStyled.CenteredTableCell>

              <CommonStyled.CenteredTableCell>
                Dataset
              </CommonStyled.CenteredTableCell>

              <TableCell>Status</TableCell>

              <Styled.ActionHeaderTableCell>
                Actions
              </Styled.ActionHeaderTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {benchmarkingSessions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(({ id, aiImplementations, status, caseSet }) => (
                <TableRow key={id}>
                  <TableCell>
                    {id}
                    <CommonStyled.SecondaryTextInCell>
                      {aiImplementations.length} AI implementations
                    </CommonStyled.SecondaryTextInCell>
                  </TableCell>

                  <TableCell>
                    <ul>
                      {aiImplementations.map((aiID) => (
                        <li key={aiID}>
                          {AIs.find((ai_) => ai_.id === aiID).name}
                        </li>
                      ))}
                    </ul>
                  </TableCell>

                  <TableCell>
                    {datasets.find((dataset) => dataset.id === caseSet).name}
                  </TableCell>

                  <TableCell>
                    <BenchmarkingSessionStatusIcon status={status} />
                  </TableCell>

                  <CommonStyled.CenteredTableCell>
                    <Tooltip title="Start benchmarking session">
                      <span>
                        <LinkWrapper
                          to={paths.benchmarkRun(id)}
                          // history.push(paths.benchmarkRun(benchmarkingSession.id));

                          disabled={
                            status !== BenchmarkingSessionStatus.CREATED
                          }
                        >
                          <IconButton
                            aria-label="start benchmark"
                            onClick={() => runBenchmarkingSession(id)}
                            disabled={
                              status !== BenchmarkingSessionStatus.CREATED
                            }
                          >
                            <StartBenchmarkIcon />
                          </IconButton>
                        </LinkWrapper>
                      </span>
                    </Tooltip>
                    <Tooltip title="View results">
                      <span>
                        <LinkWrapper
                          to={paths.benchmarkEvaluate(id)}
                          disabled={
                            status !== BenchmarkingSessionStatus.FINISHED
                          }
                        >
                          <IconButton
                            aria-label="view"
                            disabled={
                              status !== BenchmarkingSessionStatus.FINISHED
                            }
                          >
                            <OpenIcon />
                          </IconButton>
                        </LinkWrapper>
                      </span>
                    </Tooltip>
                    <ConfirmationIconButton
                      onConfirmed={(): void => deleteBenchmarkingSession(id)}
                      color="darkred"
                      label="Hold to delete"
                    >
                      <DeleteIcon />
                    </ConfirmationIconButton>
                  </CommonStyled.CenteredTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default BenchmarkingSessionManagerComponent;
