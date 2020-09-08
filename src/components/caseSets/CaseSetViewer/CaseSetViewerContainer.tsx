import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { CaseSetInfo } from '../../../data/caseSets/caseSetDataType';
import BasicPageLayout from '../../common/BasicPageLayout';
import CaseSetViewerComponent from './CaseSetViewerComponent';

import { fetchFullDataset, saveDataset, deleteCase } from '../../../data/datasetDuck';
import { paths } from '../../../routes';
import LinkWrapper from '../../common/LinkWrapper';

type Params = {
  caseSetId: string;
};

const CaseSetViewerContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { caseSetId } = useParams<Params>();

  useEffect(() => {
    dispatch(fetchFullDataset(caseSetId));
  }, []);

  const fullDataset = useSelector((state: any) => state.datasets.fullDataset);

  const saveCaseSet = (editedCaseSet: CaseSetInfo): void => {
    dispatch(saveDataset(editedCaseSet));
  };

  return (
    <BasicPageLayout
      title={`Cases in '${caseSetId}'`}
      action={
        <LinkWrapper to={paths.caseSetManager()}>
          <Button variant="contained" color="primary">
            View Case Sets
          </Button>
        </LinkWrapper>
      }
    >
      {fullDataset && (
        <div>
          <CaseSetViewerComponent
            caseSet={fullDataset}
            saveCaseSet={saveCaseSet}
            deleteCase={(case_) => dispatch(deleteCase(case_))}
          />
        </div>
      )}
    </BasicPageLayout>
  );
};

export default CaseSetViewerContainer;
