import React, { useMemo } from 'react';

import { useForm, FormContext } from 'react-hook-form';
import { Box, Button, Grid } from '@material-ui/core';

import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json';

import TopSection from './TopSection';
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
        <Grid container direction={'column'}>
          <Grid item xs={12}>
            <TopSection case_={case_} errors={errors} possibleConditions={possibleConditions} />
          </Grid>

          <Grid item container spacing={1} direction={'row'} alignItems="flex-start">
            <Grid item xs={12}>
              <CaseDataSection case_={case_} possibleClinicalFindings={possibleClinicalFindings} />
            </Grid>

            <Grid item xs={12}>
              <ValuesToPredictSection case_={case_} possibleConditions={possibleConditions} />
            </Grid>
          </Grid>
        </Grid>

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
