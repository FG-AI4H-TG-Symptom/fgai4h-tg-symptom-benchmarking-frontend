import React from 'react';
import { Grid } from '@material-ui/core';

import { paths } from '../../../routes';
import DashboardCard from './DashboardCard';

const aiImageURL =
  'https://storage.googleapis.com/itu-fgai4h-assets/frontend-dashboard/Ada_Ai_Implementations_Cover.jpg';
const datasetsImageURL = 'https://storage.googleapis.com/itu-fgai4h-assets/frontend-dashboard/Ada_Datasets_Cover.jpg';
const sessionsImageURL =
  'https://storage.googleapis.com/itu-fgai4h-assets/frontend-dashboard/Ada_Benchmarking_Sessions_Cover.jpg';

interface Props {
  AIs: Record<string, unknown>[];
  sessions: Record<string, unknown>[];
  datasets: Record<string, unknown>[];
}

const DashboardComponent: React.FC<Props> = ({ AIs, sessions, datasets }) => {
  return (
    <>
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={12} sm={12} md={3}>
          <DashboardCard
            title="AI Implementations"
            count={AIs.length}
            link={paths.aiImplementationManager()}
            image={aiImageURL}
            addNewLink={paths.aiImplementationRegistration()}
            showFull={false}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <DashboardCard
            title="Datasets"
            count={datasets.length}
            link={paths.caseSetManager()}
            image={datasetsImageURL}
            addNewLink={paths.caseSetGenerator()}
            showFull={false}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <DashboardCard
            title="Benchmarking Sessions"
            count={sessions.length}
            link={paths.benchmarkingSessions()}
            image={sessionsImageURL}
            addNewLink={paths.benchmarkCreate()}
            showFull={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardComponent;
