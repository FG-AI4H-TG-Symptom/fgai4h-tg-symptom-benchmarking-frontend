import React, { useState } from 'react';
import {
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  PlayCircleOutline as StartBenchmarkIcon,
  ViewList as OpenIcon,
} from '@material-ui/icons';

import { BenchmarkingSessionStatus } from '../../../data/benchmarks/benchmarkManagerDataType';
import LinkWrapper from '../../common/LinkWrapper';
import { paths } from '../../../routes';

import BenchmarkingSessionStatusIcon from './BenchmarkingSessionStatusIcon';
import ConfirmationIconButton from '../../common/ConfirmationIconButton';
import formatDate from '../../../util/formatDate';

const rowsPerPageOptions = [10, 20, 50, 100];

const BenchmarkingSessionManagerComponent: React.FC<any> = ({
  benchmarkingSessions,
  datasets,
  AIs,
  deleteBenchmarkingSession,
  runBenchmarkingSession,
}) => {
  const activeRowsPerPageOptions = rowsPerPageOptions.filter(
    (rowsPerPageOption) => rowsPerPageOption <= benchmarkingSessions.length,
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

              <TableCell>Created On</TableCell>

              <TableCell>AIs</TableCell>

              <TableCell>Dataset</TableCell>

              <TableCell>Status</TableCell>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {benchmarkingSessions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((benchmarkingSession) => {
                const { id, aiImplementations, status, caseSet, createdOn } = benchmarkingSession;

                const date = new Date(createdOn);

                let progress = 0;
                if (benchmarkingSession.statistics) {
                  progress =
                    (benchmarkingSession.statistics.currentCaseIndex / benchmarkingSession.statistics.totalCaseCount) *
                    100;
                }

                return (
                  <TableRow key={id}>
                    <TableCell>
                      {id}
                      {/* <CommonStyled.SecondaryTextInCell>
                        {aiImplementations.length} AI implementations
                      </CommonStyled.SecondaryTextInCell> */}
                    </TableCell>

                    <TableCell>{formatDate(date)}</TableCell>

                    <TableCell>
                      <ul style={{ paddingLeft: 0 }}>
                        {aiImplementations.map((aiID) => (
                          <li key={aiID}>{AIs.find((ai_) => ai_.id === aiID)?.name}</li>
                        ))}
                      </ul>
                    </TableCell>

                    <TableCell>
                      <div>
                        <Typography variant="subtitle1">
                          {' '}
                          {datasets.find((dataset) => dataset.id === caseSet)?.name}
                        </Typography>
                        <Typography variant="caption" color="secondary">
                          {datasets.find((dataset) => dataset.id === caseSet)?.cases.length} cases
                        </Typography>
                      </div>
                    </TableCell>

                    <TableCell>
                      {status === BenchmarkingSessionStatus.RUNNING ? (
                        <LinearProgress variant="determinate" value={progress} />
                      ) : (
                        <BenchmarkingSessionStatusIcon status={status} />
                      )}
                    </TableCell>

                    <TableCell>
                      <Tooltip title="Start benchmarking session">
                        <span>
                          <LinkWrapper
                            to={paths.benchmarkRun(id)}
                            // history.push(paths.benchmarkRun(benchmarkingSession.id));

                            disabled={status !== BenchmarkingSessionStatus.CREATED}
                          >
                            <IconButton
                              aria-label="start benchmark"
                              onClick={() =>
                                runBenchmarkingSession({
                                  id,
                                  aiImplementations,
                                  caseSet,
                                })
                              }
                              disabled={status !== BenchmarkingSessionStatus.CREATED}
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
                            disabled={status !== BenchmarkingSessionStatus.FINISHED}
                          >
                            <IconButton aria-label="view" disabled={status !== BenchmarkingSessionStatus.FINISHED}>
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
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default BenchmarkingSessionManagerComponent;
