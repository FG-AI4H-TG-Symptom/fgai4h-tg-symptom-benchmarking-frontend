import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardComponent from './DashboardComponent';
import { fetchAIs } from '../../../data/aiDuck';
import { fetchDatasets } from '../../../data/datasetDuck';
import { fetchSessions } from '../../../data/sessionsDuck';

const DashboardContainer: React.FC = () => {
  const dispatch = useDispatch();

  // fetch AIs and Datasets once when the component is mounted
  useEffect(() => {
    dispatch(fetchAIs());
    dispatch(fetchDatasets());
    dispatch(fetchSessions());
  }, []);

  const AIs = useSelector((state: any) => state.AIs.list);
  const datasets = useSelector((state: any) => state.datasets.list);
  const sessions = useSelector((state: any) => state.sessions.list);

  return <DashboardComponent AIs={AIs} datasets={datasets} sessions={sessions} />;
};

export default DashboardContainer;
