import React from 'react';
import { Grid } from '@material-ui/core';

import styled from 'styled-components';
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

const LandingPageComponent: React.FC<Props> = ({ AIs, sessions, datasets }) => {
  const section = {
    height: '100%',
    paddingTop: 5,
  };

  const StyledContainer = styled.div`
    padding: 2rem;
    display: flex;
    justify-content: center;
  `;

  return (
    <StyledContainer>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <div style={section}>
            <DashboardCard
              title="AI Implementations"
              count={AIs.length}
              link={paths.aiImplementationManager()}
              image={aiImageURL}
              addNewLink={paths.aiImplementationRegistration()}
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <div style={section}>
            <DashboardCard
              title="Datasets"
              count={datasets.length}
              link={paths.caseSetManager()}
              image={datasetsImageURL}
              addNewLink={paths.caseSetGenerator()}
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <div style={section}>
            <DashboardCard
              title="Benchmarking Sessions"
              count={sessions.length}
              link={paths.benchmarkingSessions()}
              image={sessionsImageURL}
              addNewLink={paths.benchmarkCreate()}
            />
          </div>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default LandingPageComponent;
