import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip } from "@material-ui/core";
import { Add as CreateIcon } from "@material-ui/icons";

import BenchmarkingSessionManagerComponent from "./BenchmarkingSessionManagerComponent";
import BasicPageLayout from "../../common/BasicPageLayout";
import LinkWrapper from "../../common/LinkWrapper";
import { paths } from "../../../routes";

import { fetchSessions, deleteSession } from "../../../data/sessionsDuck";

const BenchmarkingSessionManagerContainer: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const deleteBenchmarkingSession = (sessionId): void => {
    dispatch(deleteSession({ sessionId }));
  };

  // fetch sessions once, when the component is mounted
  useEffect(() => {
    dispatch(fetchSessions());
  }, []);

  const sessionsList = useSelector((state: any) => state.sessions.list);

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
      <BenchmarkingSessionManagerComponent
        benchmarkingSessions={sessionsList}
        deleteBenchmarkingSession={deleteBenchmarkingSession}
      />
    </BasicPageLayout>
  );
};

export default BenchmarkingSessionManagerContainer;
