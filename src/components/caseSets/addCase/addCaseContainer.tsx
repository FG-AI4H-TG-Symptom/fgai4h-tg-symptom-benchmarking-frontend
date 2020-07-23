import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CaseEditorComponent from "../CaseEditor/CaseEditorComponent";
import BasicPageLayout from "../../common/BasicPageLayout";

import { saveCase } from "../../../data/datasetDuck";

const AddCaseContainer: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { caseSetId } = useParams();

  useEffect(() => {
    // dispatch(fetchFullDataset(caseSetId));
  }, []);

  return (
    <BasicPageLayout title={`Add Case`}>
      <CaseEditorComponent
        caseData={{}}
        saveCase={(data) => {
          dispatch(saveCase({ ...data, caseSetId }));
        }}
      />
    </BasicPageLayout>
  );
};

export default AddCaseContainer;
