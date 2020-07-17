import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { caseSetSaveCaseDataAction } from "../../../data/caseSets/caseSetActions";
import { Notification } from "../../../data/application/applicationReducers";
import { queueNotification as queueNotificationAction } from "../../../data/application/applicationActions";
import { CaseDataType } from "../../../data/caseSets/caseDataType";
import BasicPageLayout from "../../common/BasicPageLayout";

import CaseEditorComponent from "./CaseEditorComponent";
import { fetchFullDataset } from "../../../data/datasetDuck";

const CaseEditorContainer: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { caseId, caseSetId } = useParams();

  useEffect(() => {
    dispatch(fetchFullDataset(caseSetId));
  }, []);

  const fullDataset = useSelector((state: any) => state.datasets.fullDataset);

  const queueNotification = (notification: Notification): void => {
    dispatch(queueNotificationAction(notification));
  };

  const saveCase = (case_: CaseDataType): void => {
    dispatch(
      caseSetSaveCaseDataAction.load(case_, {
        caseSetId,
        caseId: case_.id,
        onSuccess: () => {
          queueNotification({
            message: "Case saved",
            type: "success",
          });
        },
      })
    );
  };

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
          saveCase={saveCase}
        />
      )}
    </BasicPageLayout>
  );
};

export default CaseEditorContainer;
