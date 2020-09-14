import { Box, Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAIs } from '../../../data/aiDuck';
import { fetchDatasets } from '../../../data/datasetDuck';
import { deleteSession, fetchSessions, runSession } from '../../../data/sessionsDuck';
import { paths } from '../../../routes';
import BasicPageLayout from '../../common/BasicPageLayout';
import LinkWrapper from '../../common/LinkWrapper';
import BenchmarkingSessionManagerComponent from './BenchmarkingSessionManagerComponent';

const BenchmarkingSessionManagerContainer: React.FC = () => {
  const dispatch = useDispatch();

  const deleteBenchmarkingSession = (sessionId): void => {
    dispatch(deleteSession({ sessionId }));
  };

  const runBenchmarkingSession = (session): void => {
    dispatch(runSession(session));
  };

  useEffect(() => {
    dispatch(fetchAIs());
    dispatch(fetchDatasets());
    dispatch(fetchSessions());
  }, []);

  const sessionsList = useSelector((state: any) => state.sessions.list);
  const datasetsList = useSelector((state: any) => state.datasets.list);
  const aisList = useSelector((state: any) => state.AIs.list);

  return (
    <BasicPageLayout title="Benchmarking sessions">
      {datasetsList && (
        <>
          <BenchmarkingSessionManagerComponent
            benchmarkingSessions={sessionsList}
            datasets={datasetsList}
            AIs={aisList}
            deleteBenchmarkingSession={deleteBenchmarkingSession}
            runBenchmarkingSession={runBenchmarkingSession}
          />

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <LinkWrapper to={paths.benchmarkCreate()}>
              <Button variant="contained" color="primary">
                Create Benchmarking Session
              </Button>
            </LinkWrapper>
          </Box>
        </>
      )}
    </BasicPageLayout>
  );
};

export default BenchmarkingSessionManagerContainer;
