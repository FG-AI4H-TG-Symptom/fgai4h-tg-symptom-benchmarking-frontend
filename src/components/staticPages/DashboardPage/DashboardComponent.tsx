import React from 'react';
import { Grid } from '@material-ui/core';

import styled from 'styled-components';
import { paths } from '../../../routes';
import DashboardCard from './DashboardCard';

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
    padding: 2rem;
    display: flex;
    justify-content: center;
  `;
  /* eslint-disable global-require */
  const image1 = require('../../../images/rept1.jpeg');
  const image2 = require('../../../images/rept2.jpeg');
  const image3 = require('../../../images/rept3.jpeg');
  /* eslint-enable global-require */

  return (
    <StyledContainer>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <div style={section}>
            <DashboardCard
              title="AI Implementations"
              count={AIs.length}
              link={paths.aiImplementationManager()}
              image={image1}
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
              image={image2}
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
              image={image3}
              addNewLink={paths.benchmarkCreate()}
            />
          </div>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default LandingPageComponent;
