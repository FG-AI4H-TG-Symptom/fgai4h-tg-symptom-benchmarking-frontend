import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";

import styled from "styled-components";
import { paths } from "../../../routes";
import DashboardCard from "./DashboardCard";

import { fetchDatasets } from "../../../data/datasetDuck";
import { fetchAIs } from "../../../data/aiDuck";
import { fetchSessions } from "../../../data/sessionsDuck";

const LandingPageComponent: React.FC = () => {
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

  const section = {
    height: "100%",
    paddingTop: 5,
  };

  const StyledContainer = styled.div`
    padding: 2rem;
    padding: 2rem;
    display: flex;
    justify-content: center;
  `;
  /* eslint-disable global-require */
  const image1 = require("../../../images/rept1.jpeg");
  const image2 = require("../../../images/rept2.jpeg");
  const image3 = require("../../../images/rept3.jpeg");
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
