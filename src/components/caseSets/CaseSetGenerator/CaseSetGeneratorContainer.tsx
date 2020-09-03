import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import BasicPageLayout from "../../common/BasicPageLayout";
import { paths } from "../../../routes";

import { synthesizeDataset } from "../../../data/datasetDuck";

import CaseSetGeneratorComponent from "./CaseSetGeneratorComponent";

const CaseSetCreatorContainer: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const createCaseSet = (caseSetParameters) => {
    dispatch(synthesizeDataset(caseSetParameters));
    history.push(paths.caseSetManager());
  };

  return (
    <BasicPageLayout title="Generate new case set">
      <CaseSetGeneratorComponent onCreateCaseSet={createCaseSet} />
    </BasicPageLayout>
  );
};

export default CaseSetCreatorContainer;
