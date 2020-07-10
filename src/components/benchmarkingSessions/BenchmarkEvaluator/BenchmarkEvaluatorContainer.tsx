import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Delete as DeleteIcon } from "@material-ui/icons";

import { benchmarkingSessionDeleteDataAction } from "../../../data/benchmarks/benchmarkActions";
import BasicPageLayout from "../../common/BasicPageLayout";
import ConfirmationIconButton from "../../common/ConfirmationIconButton";
import { paths } from "../../../routes";

import BenchmarkEvaluatorComponent from "./BenchmarkEvaluatorComponent";
import { fetchEvaluation } from "../../../data/sessionsDuck";
import { fetchAIs } from "../../../data/aiDuck";

const BenchmarkEvaluatorContainer: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { benchmarkId: benchmarkingSessionId } = useParams();

  // fetch evaluation once, when the component is mounted
  useEffect(() => {
    dispatch(fetchAIs());
    dispatch(fetchEvaluation(benchmarkingSessionId));
  }, []);

  const AIs = useSelector((state: any) => state.AIs);
  const evaluation = useSelector((state: any) => state.sessions.evaluation);

  const deleteBenchmarkingSession = (): void => {
    dispatch(
      benchmarkingSessionDeleteDataAction.load(benchmarkingSessionId, {
        benchmarkingSessionId,
        onSuccess: () => history.push(paths.benchmarkingSessions()),
      })
    );
  };

  return (
    <BasicPageLayout
      title="Benchmark evaluation"
      action={
        <ConfirmationIconButton
          onConfirmed={deleteBenchmarkingSession}
          color="darkred"
          label="Hold to delete benchmarking session"
        >
          <DeleteIcon />
        </ConfirmationIconButton>
      }
    >
      {evaluation && (
        <BenchmarkEvaluatorComponent
          evaluation={evaluation}
          aiImplementations={AIs.list}
        />
      )}
    </BasicPageLayout>
  );
};

export default BenchmarkEvaluatorContainer;
