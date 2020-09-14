import { CircularProgress } from '@material-ui/core';
import queryString from 'qs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { fetchAIs } from '../../../data/aiDuck';
import { fetchDatasets } from '../../../data/datasetDuck';
import { addSession } from '../../../data/sessionsDuck';
import { paths } from '../../../routes';
import BasicPageLayout from '../../common/BasicPageLayout';
import Error from '../../common/Error';
import BenchmarkCreatorComponent from './BenchmarkCreatorComponent';

const BenchmarkCreatorContainer: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // fetch AIs and Datasets once when the component is mounted
  useEffect(() => {
    dispatch(fetchAIs());
    dispatch(fetchDatasets());
  }, []);

  const AIs = useSelector((state: any) => state.AIs);
  const datasets = useSelector((state: any) => state.datasets);

  const searchParams = queryString.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  });

  const onCreateBenchmark = (benchmarkParameters) => {
    dispatch(addSession({ benchmarkParameters, history }));
    history.push(paths.benchmarkingSessions());
  };

  let content = <CircularProgress />;

  if (AIs.error) {
    content = <Error error={AIs.error} />;
  } else if (datasets.error) {
    content = <Error error={datasets.error} />;
  } else {
    content = (
      <BenchmarkCreatorComponent
        aiImplementations={AIs.list}
        caseSetList={datasets.list}
        defaultCaseSetId={searchParams.caseSetId}
        onCreateBenchmark={onCreateBenchmark}
      />
    );
  }

  return <BasicPageLayout title="Select settings for a new benchmark">{content}</BasicPageLayout>;
};

export default BenchmarkCreatorContainer;
