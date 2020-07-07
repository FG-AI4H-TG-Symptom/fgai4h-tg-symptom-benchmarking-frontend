import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import BasicPageLayout from "../../common/BasicPageLayout";
import { paths } from "../../../routes";

import { addDataset } from "../../../data/datasetDuck";

import CaseSetCreatorComponent from "./CaseSetCreatorComponent";

const CaseSetCreatorContainer: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const createCaseSet = caseSetParameters => {
    dispatch(addDataset(caseSetParameters));
    history.push(paths.caseSetManager());
  };

  return (
    <BasicPageLayout title="Generate a new case set">
      <CaseSetCreatorComponent onCreateCaseSet={createCaseSet} />
    </BasicPageLayout>
  );
};

export default CaseSetCreatorContainer;
