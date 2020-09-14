import { Box, Button, LinearProgress } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { BenchmarkingSessionStatus } from '../../../data/benchmarks/benchmarkManagerDataType';
import { paths } from '../../../routes';
import BasicPageLayout from '../../common/BasicPageLayout';
import BenchmarkRunnerComponent from './BenchmarkRunnerComponent';

type Params = {
  benchmarkId: string;
};

const BenchmarkRunnerContainer: React.FC = () => {
  const { benchmarkId } = useParams<Params>();
  const history = useHistory();
  const AIs = useSelector((state: any) => state.AIs);
  const sessions = useSelector((state: any) => state.sessions);

  const runningSession = sessions.list.find((session) => session.id === benchmarkId);

  if (!runningSession) {
    return <div />;
  }
  let progress = sessions.report.statistics
    ? (sessions.report.statistics.currentCaseIndex / sessions.report.statistics.totalCaseCount) * 100
    : 0;

  if (runningSession.status === BenchmarkingSessionStatus.FINISHED) {
    progress = 100;
  }

  return (
    <BasicPageLayout title={<>Running benchmark {runningSession.id}</>}>
      <LinearProgress variant="determinate" value={progress} />

      <BenchmarkRunnerComponent benchmarkingSession={runningSession} report={sessions.report} AIs={AIs.list} />

      {runningSession.status === BenchmarkingSessionStatus.FINISHED && (
        <Box display="flex" justifyContent="flex-end" marginTop={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history.push(paths.benchmarkEvaluate(benchmarkId));
            }}
          >
            View Evaluation
          </Button>
        </Box>
      )}
    </BasicPageLayout>
  );
};

export default BenchmarkRunnerContainer;
