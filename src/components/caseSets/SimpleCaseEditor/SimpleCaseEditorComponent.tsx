import React, { useMemo } from 'react';

import { useForm, FormContext } from 'react-hook-form';
import { Box, Button } from '@material-ui/core';

import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json';

import MetaDataSection from './MetaDataSection';
import CaseDataSection from './CaseDataSection';
import ValuesToPredictSection from './ValuesToPredictSection';
import { refToConcept } from './utility';

const SimpleCaseEditorComponent: React.FC<any> = ({ case_, onSaveCase }) => {
  const possibleClinicalFindings = useMemo(
    () => berlinModelSchema.definitions.clinicalFinding.oneOf.map(({ $ref }) => refToConcept($ref)),
    [],
  );

  const possibleConditions = useMemo(
    () => berlinModelSchema.definitions.condition.oneOf.map(({ $ref }) => refToConcept($ref)),
    [],
  );

  const methods = useForm();
  const { handleSubmit, errors } = methods;

  const onSubmit = (data) => {
    onSaveCase(data, case_);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContext {...methods}>
        <MetaDataSection case_={case_} errors={errors} />

        <CaseDataSection case_={case_} possibleClinicalFindings={possibleClinicalFindings} />

        <ValuesToPredictSection case_={case_} possibleConditions={possibleConditions} />

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button type={'submit'} variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </FormContext>
    </form>
  );
};

export default SimpleCaseEditorComponent;
