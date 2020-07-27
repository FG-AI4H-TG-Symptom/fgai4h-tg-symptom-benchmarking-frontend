import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Box } from "@material-ui/core";

import CaseSetManagerComponent from "./CaseSetManagerComponent";
import BasicPageLayout from "../../common/BasicPageLayout";
import LinkWrapper from "../../common/LinkWrapper";
import { paths } from "../../../routes";

import { fetchDatasets, deleteDataset } from "../../../data/datasetDuck";

const CaseSetManagerContainer: React.FC<{}> = () => {
  const dispatch = useDispatch();

  // fetch Datasets once, when the component is mounted
  useEffect(() => {
    dispatch(fetchDatasets());
  }, []);

  const datasetsList = useSelector((state: any) => state.datasets.list);

  const deleteCaseSet = (caseSetId: string): void => {
    dispatch(deleteDataset({ caseSetId }));
  };

  return (
    <BasicPageLayout title="Case sets">
      <CaseSetManagerComponent
        datasetsList={datasetsList}
        deleteCaseSet={deleteCaseSet}
      />

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Box>
          <LinkWrapper to={paths.caseSetGenerator()}>
            <Button variant="contained" color="primary">
              Generate Dataset
            </Button>
          </LinkWrapper>
        </Box>
        <Box ml={1}>
          <LinkWrapper to={paths.datasetCreator()}>
            <Button variant="contained" color="primary">
              Create Empty Dataset
            </Button>
          </LinkWrapper>
        </Box>
      </Box>
    </BasicPageLayout>
  );
};

export default CaseSetManagerContainer;
