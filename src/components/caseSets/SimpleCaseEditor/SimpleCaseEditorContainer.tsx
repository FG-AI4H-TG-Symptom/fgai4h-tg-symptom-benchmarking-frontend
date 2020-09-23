/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import BasicPageLayout from '../../common/BasicPageLayout';

import SimpleCaseEditorComponent from './SimpleCaseEditorComponent';
import { fetchFullDataset, saveCase } from '../../../data/datasetDuck';

type Params = {
  caseId: string;
  caseSetId: string;
};

const CaseEditorContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { caseId, caseSetId } = useParams<Params>();

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
      {fullDataset && <SimpleCaseEditorComponent case_={fullDataset.cases.find(({ id }) => id === caseId)} />}
    </BasicPageLayout>
  );
};

export default CaseEditorContainer;
