import React, { useMemo } from 'react';

import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json';
import { refToConcept } from '../CaseEditor/utils';
import MetaDataSection from './MetaDataSection';
import CaseDataSection from './CaseDataSection';
import ValuesToPredictSection from './ValuesToPredictSection';
import { formatCaseForBackend } from './utility';
import { saveCase } from '../../../data/datasetDuck';

const CaseEditorComponent: React.FC<any> = ({ case_ }) => {
  const dispatch = useDispatch();

  const possibleClinicalFindings = useMemo(
    () => berlinModelSchema.definitions.clinicalFinding.oneOf.map(({ $ref }) => refToConcept($ref)),
    [],
  );

  const possibleConditions = useMemo(
    () => berlinModelSchema.definitions.condition.oneOf.map(({ $ref }) => refToConcept($ref)),
    [],
  );

  console.log('case_', case_);

  const methods = useForm();
  const { handleSubmit, errors } = methods;

  const onSubmit = (data) => {
    const { caseSets, id } = case_;

    const formattedCase = formatCaseForBackend(data, possibleConditions, caseSets, possibleClinicalFindings, id);

    dispatch(saveCase(formattedCase));

    console.log('####submitted', formattedCase);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <MetaDataSection case_={case_} errors={errors} />

        <CaseDataSection case_={case_} possibleClinicalFindings={possibleClinicalFindings} />

        <ValuesToPredictSection case_={case_} possibleConditions={possibleConditions} />

        <Button type={'submit'}>Submit</Button>
      </FormProvider>
    </form>
  );
};

export default CaseEditorComponent;
