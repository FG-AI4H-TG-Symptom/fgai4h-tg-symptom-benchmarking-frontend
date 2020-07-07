import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "qs";
import { CircularProgress } from "@material-ui/core";

import Error from "../../common/Error";
import BasicPageLayout from "../../common/BasicPageLayout";

import BenchmarkCreatorComponent from "./BenchmarkCreatorComponent";

import { fetchDatasets } from "../../../data/datasetDuck";
import { fetchAIs } from "../../../data/aiDuck";
import { addSession } from "../../../data/sessionsDuck";

const BenchmarkCreatorContainer: React.FC<{}> = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // fetch AIs and Datasets once when the component is mounted
  useEffect(() => {
    dispatch(fetchAIs());
    dispatch(fetchDatasets());
  }, []);

  const AIs = useSelector((state: any) => state.AIs);
  const datasets = useSelector((state: any) => state.datasets);

  const searchParams = queryString.parse(useLocation().search, {
    ignoreQueryPrefix: true
  });

  // const newBenchmarkingSession = useSelector<RootState, LoadableCreateOnly>(
  //   (state) => state.benchmark[ID_PLACEHOLDER_NEW] || InitialState
  // );

  const onCreateBenchmark = benchmarkParameters => {
    dispatch(addSession({ benchmarkParameters, history }));
  };

  // if (newBenchmarkingSession.state === DataState.LOADING) {
  //   return (
  //     <>
  //       <Typography variant="h2" gutterBottom>
  //         Creating benchmark...
  //       </Typography>
  //       <CircularProgress />
  //     </>
  //   );
  // }

  let content = <CircularProgress />;

  if (AIs.error) {
    content = <Error error={AIs.error} />;
  } else if (datasets.error) {
    content = <Error error={datasets.error} />;
  } else {
    content = (
      <BenchmarkCreatorComponent
        aiImplementations={AIs.list}
        caseSetList={datasets.list}
        defaultCaseSetId={searchParams.caseSetId}
        onCreateBenchmark={onCreateBenchmark}
      />
    );
  }

  return (
    <BasicPageLayout title="Select settings for a new benchmark">
      {content}
    </BasicPageLayout>
  );
};

export default BenchmarkCreatorContainer;
