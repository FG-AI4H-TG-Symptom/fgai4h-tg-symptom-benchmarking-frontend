import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";
import { Button, Box, Snackbar } from "@material-ui/core";

import CaseSetManagerComponent from "./CaseSetManagerComponent";
import BasicPageLayout from "../../common/BasicPageLayout";
import LinkWrapper from "../../common/LinkWrapper";
import { paths } from "../../../routes";

import { fetchDatasets, deleteDataset } from "../../../data/datasetDuck";

const CaseSetManagerContainer: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const datasetsList = useSelector((state: any) => state.datasets.list);
  const sessions = useSelector((state: any) => state.sessions.list);

  // fetch Datasets once, when the component is mounted
  useEffect(() => {
    dispatch(fetchDatasets());
  }, []);

  const deleteCaseSet = (caseSetId: string): void => {
    const sessionUsingThisCaseSet = sessions
      .filter((session) => session.caseSet === caseSetId)
      .map((session) => session.id);

    if (sessionUsingThisCaseSet.length > 0) {
      setError(
        `Please first delete Benchmarking sessions with the following IDs: ${sessionUsingThisCaseSet.join(
          ", "
        )} `
      );
      setErrorOpen(true);
      return;
    }

    dispatch(deleteDataset({ caseSetId }));
  };

  return (
    <BasicPageLayout title="Case sets">
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <CaseSetManagerComponent
        datasetsList={datasetsList}
        deleteCaseSet={deleteCaseSet}
      />

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Box>
          <LinkWrapper to={paths.caseSetGenerator()}>
            <Button variant="contained" color="primary">
              Generate Case Set
            </Button>
          </LinkWrapper>
        </Box>
        {/* <Box ml={1}>
          <LinkWrapper to={paths.datasetCreator()}>
            <Button variant="contained" color="primary">
              Create Empty Dataset
            </Button>
          </LinkWrapper>
        </Box> */}
      </Box>
    </BasicPageLayout>
  );
};

export default CaseSetManagerContainer;
