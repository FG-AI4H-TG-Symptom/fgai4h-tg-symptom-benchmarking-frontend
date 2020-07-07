import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IconButton, Tooltip } from "@material-ui/core";
import { Add as CreateIcon } from "@material-ui/icons";

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
    <BasicPageLayout
      title="Case sets"
      action={
        <LinkWrapper to={paths.caseSetCreator()}>
          <Tooltip title="Create case set">
            <IconButton>
              <CreateIcon />
            </IconButton>
          </Tooltip>
        </LinkWrapper>
      }
    >
      <CaseSetManagerComponent
        datasetsList={datasetsList}
        deleteCaseSet={deleteCaseSet}
      />
    </BasicPageLayout>
  );
};

export default CaseSetManagerContainer;
