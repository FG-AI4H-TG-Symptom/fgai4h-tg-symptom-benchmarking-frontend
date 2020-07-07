import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CaseSetInfo } from "../../../data/caseSets/caseSetDataType";
import BasicPageLayout from "../../common/BasicPageLayout";

import CaseSetViewerComponent from "./CaseSetViewerComponent";
import { fetchFullDataset, saveDataset } from "../../../data/datasetDuck";

const CaseSetViewerContainer: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { caseSetId } = useParams();

  useEffect(() => {
    dispatch(fetchFullDataset(caseSetId));
  }, []);

  const fullDataset = useSelector((state: any) => state.datasets.fullDataset);

  const saveCaseSet = (editedCaseSet: CaseSetInfo): void => {
    dispatch(saveDataset(editedCaseSet));
  };

  return (
    <BasicPageLayout title={`Cases in '${caseSetId}'`}>
      {fullDataset && (
        <CaseSetViewerComponent
          caseSet={fullDataset}
          saveCaseSet={saveCaseSet}
        />
      )}
    </BasicPageLayout>
  );
};

export default CaseSetViewerContainer;
