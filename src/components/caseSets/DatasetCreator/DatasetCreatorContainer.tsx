import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import BasicPageLayout from "../../common/BasicPageLayout";
import { paths } from "../../../routes";

import { createCaseSet } from "../../../data/datasetDuck";

import DatasetCreatorComponent from "./DatasetCreatorComponent";

const CaseSetCreatorContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onCreateCaseSet = (caseSetParameters) => {
    dispatch(createCaseSet(caseSetParameters));
    history.push(paths.caseSetManager());
  };

  return (
    <BasicPageLayout title="Create Empty dataset">
      <DatasetCreatorComponent onCreateCaseSet={onCreateCaseSet} />
    </BasicPageLayout>
  );
};

export default CaseSetCreatorContainer;
