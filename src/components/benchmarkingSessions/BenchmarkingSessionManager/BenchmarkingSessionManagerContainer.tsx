import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip } from "@material-ui/core";
import { Add as CreateIcon } from "@material-ui/icons";

import BenchmarkingSessionManagerComponent from "./BenchmarkingSessionManagerComponent";
import BasicPageLayout from "../../common/BasicPageLayout";
import LinkWrapper from "../../common/LinkWrapper";
import { paths } from "../../../routes";

import {
  fetchSessions,
  deleteSession,
  runSession,
} from "../../../data/sessionsDuck";
import { fetchAIs } from "../../../data/aiDuck";
import { fetchDatasets } from "../../../data/datasetDuck";

const BenchmarkingSessionManagerContainer: React.FC<{}> = () => {
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
    <BasicPageLayout
      title="Benchmarking sessions"
      action={
        <LinkWrapper to={paths.benchmarkCreate()}>
          <Tooltip title="Create benchmarking session">
            <IconButton>
              <CreateIcon />
            </IconButton>
          </Tooltip>
        </LinkWrapper>
      }
    >
      {datasetsList && (
        <BenchmarkingSessionManagerComponent
          benchmarkingSessions={sessionsList}
          datasets={datasetsList}
          AIs={aisList}
          deleteBenchmarkingSession={deleteBenchmarkingSession}
          runBenchmarkingSession={runBenchmarkingSession}
        />
      )}
    </BasicPageLayout>
  );
};

export default BenchmarkingSessionManagerContainer;
