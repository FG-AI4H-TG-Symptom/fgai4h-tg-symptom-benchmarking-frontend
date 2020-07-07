import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { caseSetSaveDataAction } from "../../../data/caseSets/caseSetActions";
import { Notification } from "../../../data/application/applicationReducers";
import { queueNotification as queueNotificationAction } from "../../../data/application/applicationActions";
import { CaseSetInfo } from "../../../data/caseSets/caseSetDataType";
import BasicPageLayout from "../../common/BasicPageLayout";

import CaseSetViewerComponent from "./CaseSetViewerComponent";
import { fetchFullDataset } from "../../../data/datasetDuck";

const CaseSetViewerContainer: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { caseSetId } = useParams();

  useEffect(() => {
    dispatch(fetchFullDataset(caseSetId));
  }, []);

  const fullDataset = useSelector((state: any) => state.datasets.fullDataset);

  const queueNotification = (notification: Notification): void => {
    dispatch(queueNotificationAction(notification));
  };

  const saveCaseSet = (editedCaseSet: CaseSetInfo): void => {
    dispatch(
      caseSetSaveDataAction.load(editedCaseSet, {
        caseSetId,
        onSuccess: () => {
          queueNotification({
            message: "Case set saved",
            type: "success"
          });
        }
      })
    );
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
