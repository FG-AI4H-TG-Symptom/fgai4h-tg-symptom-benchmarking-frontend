import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import BasicPageLayout from '../../common/BasicPageLayout';
import { paths } from '../../../routes';

import BenchmarkEvaluatorComponent from './BenchmarkEvaluatorComponent';
import { fetchEvaluation } from '../../../data/sessionsDuck';
import { fetchAIs } from '../../../data/aiDuck';
import { fetchDatasets } from '../../../data/datasetDuck';

type Params = {
  benchmarkId: string;
};

const BenchmarkEvaluatorContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { benchmarkId: benchmarkingSessionId } = useParams<Params>();

  useEffect(() => {
    dispatch(fetchAIs());
    dispatch(fetchDatasets());
    dispatch(fetchEvaluation(benchmarkingSessionId));
  }, []);

  const AIs = useSelector((state: any) => state.AIs);

  const evaluation = useSelector((state: any) => {
    return state.sessions.list.find((s) => s.id === benchmarkingSessionId).evaluation;
  });

  const datasets = useSelector((state: any) => state.datasets.list);

  return (
    <BasicPageLayout title="Benchmark evaluation">
      {evaluation && (
        <BenchmarkEvaluatorComponent
          evaluation={evaluation}
          aiImplementations={AIs.list.slice().sort((a, b) => a.name.localeCompare(b.name))}
          datasets={datasets}
        />
      )}

      <Box display="flex" justifyContent="flex-end" marginTop={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push(paths.benchmarkingSessions());
          }}
        >
          Back to Overview
        </Button>
      </Box>
    </BasicPageLayout>
  );
};

export default BenchmarkEvaluatorContainer;
