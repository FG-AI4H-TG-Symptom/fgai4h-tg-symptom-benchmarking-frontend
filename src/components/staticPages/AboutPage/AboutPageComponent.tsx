import * as React from 'react';

import { Box, Card, CardContent, CardHeader, Link, Typography } from '@material-ui/core';

import * as Styled from './AboutPageComponent.style';
import PageWrapper, { PageWidth } from '../../common/PageWrapper';
import logo from '../../../logo.svg';
import DashboardPage from '../DashboardPage';

const AboutPageComponent: React.FC = () => {
  return (
    <PageWrapper pageWidth={PageWidth.REGULAR}>
      <Styled.LogoWrapper>
        <Styled.Logo src={logo} alt="FG AI4H logo" />
      </Styled.LogoWrapper>

      <Typography variant="h1" align="center">
        &quot;Symptom assessment&quot; FG MMVB for AI4H (ITU/WHO)
      </Typography>
      <Box marginTop={2} marginBottom={2}>
        <Typography gutterBottom align="center">
          Minimal minimal viable benchmark for &quot;Symptom assessment&quot; sub-group of &quot;AI for Health&quot;
          Focus Group
        </Typography>
        <Typography gutterBottom align="center">
          The sub-group of the focus group of the International Telecommunication Union
        </Typography>
        <Typography align="center">
          The focus group is organised in collaboration with the World Health Organisation
        </Typography>
      </Box>

      <Box marginBottom={2}>
        <DashboardPage />
      </Box>

      <Box marginBottom={2}>
        <Card>
          <CardHeader title="Note" />
          <CardContent>
            <Typography gutterBottom>
              This is the minimal minimal viable benchmark designed and developed by the members of the sub-group (topic
              group) “Symptom assessment”, which is the part of the ITU focus group “Artificial Intelligence for
              Health”.
            </Typography>
            <Typography gutterBottom>
              The minimal minimal viable benchmark is a prototype and does not reflect in any possible way real methods,
              techniques, approaches, etc. that the members (including commercial companies) use in their products.
            </Typography>
            <Typography>
              As mentioned on the focus group website: “The ITU/WHO Focus Group on artificial intelligence for health
              (FG-AI4H) works in partnership with the World Health Organization (WHO) to establish a standardized
              assessment framework for the evaluation of AI-based methods for health, diagnosis, triage or treatment
              decisions. Participation in the FG-AI4H is free of charge and open to all.”
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Card>
        <CardHeader title="Copyright and Licence" />
        <CardContent>
          <Typography gutterBottom>
            Copyright 2019–{new Date().getFullYear()}, created jointly by the members of the ITU sub-group (topic group)
            &quot;Symptom assessment&quot; of the International Telecommunication Union focus group “Artificial
            Intelligence for Health”, which works in partnership with the World Health Organization.
          </Typography>
          <Typography gutterBottom>
            All parts of this benchmark are free software. This component (the frontend) is licensed under the{' '}
            <Link
              href="https://www.apache.org/licenses/LICENSE-2.0"
              target="_blank"
              rel="noopener noreferrer"
              color="secondary"
            >
              Apache License 2.0
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </PageWrapper>
  );
};

export default AboutPageComponent;
