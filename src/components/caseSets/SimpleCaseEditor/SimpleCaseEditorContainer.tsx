import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import BasicPageLayout from '../../common/BasicPageLayout';

import SimpleCaseEditorComponent from './SimpleCaseEditorComponent';
import { fetchFullDataset, saveCase } from '../../../data/datasetDuck';
import { formatCaseForBackend, refToConcept } from './utility';

import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json';

type Params = {
  caseId: string;
  caseSetId: string;
};

const CaseEditorContainer: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { caseId, caseSetId } = useParams<Params>();

  useEffect(() => {
    dispatch(fetchFullDataset(caseSetId));
  }, []);

  const possibleClinicalFindings = useMemo(
    () => berlinModelSchema.definitions.clinicalFinding.oneOf.map(({ $ref }) => refToConcept($ref)),
    [],
  );

  const possibleConditions = useMemo(
    () => berlinModelSchema.definitions.condition.oneOf.map(({ $ref }) => refToConcept($ref)),
    [],
  );

  const fullDataset = useSelector((state: any) => state.datasets.fullDataset);
  const theCase = fullDataset ? fullDataset.cases.find(({ id }) => id === caseId) : null;

  const onSaveCase = (data, case_) => {
    // if case did not exist then it is a new case
    const caseSets = case_ ? case_.caseSets : [caseSetId];

    const formattedCase = formatCaseForBackend(data, possibleConditions, caseSets, possibleClinicalFindings, caseId);

    dispatch(saveCase(formattedCase));
    history.goBack();
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
      {fullDataset && <SimpleCaseEditorComponent case_={theCase} onSaveCase={onSaveCase} />}
    </BasicPageLayout>
  );
};

export default CaseEditorContainer;
