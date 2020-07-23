import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import BasicPageLayout from "../../common/BasicPageLayout";

import CaseEditorComponent from "./CaseEditorComponent";
import { fetchFullDataset, saveCase } from "../../../data/datasetDuck";

const CaseEditorContainer: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { caseId, caseSetId } = useParams();

  useEffect(() => {
    dispatch(fetchFullDataset(caseSetId));
  }, []);

  const fullDataset = useSelector((state: any) => state.datasets.fullDataset);

  return (
    <BasicPageLayout
      title={`Edit case '${caseId}'`}
      subtitle={
        <>
          in case set &apos;
          {fullDataset && fullDataset.name}
          &apos;
        </>
      }
    >
      {fullDataset && (
        <CaseEditorComponent
          caseData={fullDataset.cases.find(({ id }) => id === caseId)}
          saveCase={(data) => {
            dispatch(saveCase({ ...data, caseSetId }));
          }}
        />
      )}
    </BasicPageLayout>
  );
};

export default CaseEditorContainer;
