import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@material-ui/core";
import BasicPageLayout from "../../common/BasicPageLayout";
import { paths } from "../../../routes";

import BenchmarkEvaluatorComponent from "./BenchmarkEvaluatorComponent";
import { fetchEvaluation } from "../../../data/sessionsDuck";
import { fetchAIs } from "../../../data/aiDuck";

type Params = {
  benchmarkId: string;
};

const BenchmarkEvaluatorContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { benchmarkId: benchmarkingSessionId } = useParams<Params>();

  // fetch evaluation once, when the component is mounted
  useEffect(() => {
    dispatch(fetchAIs());
    dispatch(fetchEvaluation(benchmarkingSessionId));
  }, []);

  const AIs = useSelector((state: any) => state.AIs);
  const evaluation = useSelector((state: any) => state.sessions.evaluation);

  return (
    <BasicPageLayout title="Benchmark evaluation">
      {evaluation && (
        <BenchmarkEvaluatorComponent
          evaluation={evaluation}
          aiImplementations={AIs.list}
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
