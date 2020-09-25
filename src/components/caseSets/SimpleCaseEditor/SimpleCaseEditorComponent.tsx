import React, { useMemo } from 'react';

import { useForm, FormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json';
import { refToConcept } from '../CaseEditor/utils';
import MetaDataSection from './MetaDataSection';
import CaseDataSection from './CaseDataSection';
import ValuesToPredictSection from './ValuesToPredictSection';
import { formatCaseForBackend } from './utility';
import { saveCase } from '../../../data/datasetDuck';

// const defaultCase = {
//   id: '',
//   data: {
//     caseData: {
//       otherFeatures: [],
//       profileInformation: {
//         age: 0,
//         biologicalSex: '',
//       },
//       presentingComplaints: [],
//     },
//     metaData: {
//       name: '',
//       caseCreator: '',
//     },
//     valuesToPredict: {
//       correctCondition: {},
//       expectedCondition: {},
//       expectedTriageLevel: '',
//       impossibleConditions: [],
//       otherRelevantDifferentials: [],
//     },
//   },
//   caseSets: [],
// };

const CaseEditorComponent: React.FC<any> = ({ case_ }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const possibleClinicalFindings = useMemo(
    () => berlinModelSchema.definitions.clinicalFinding.oneOf.map(({ $ref }) => refToConcept($ref)),
    [],
  );

  const possibleConditions = useMemo(
    () => berlinModelSchema.definitions.condition.oneOf.map(({ $ref }) => refToConcept($ref)),
    [],
  );

  const aCase = case_;
  // if (!aCase) {
  //   aCase = defaultCase;
  // }
  console.log('case_', aCase);

  const methods = useForm();
  const { handleSubmit, errors } = methods;

  const onSubmit = (data) => {
    const { caseSets, id } = aCase;

    const formattedCase = formatCaseForBackend(data, possibleConditions, caseSets, possibleClinicalFindings, id);

    dispatch(saveCase(formattedCase));
    history.goBack();
    console.log('####submitted', formattedCase);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContext {...methods}>
        <MetaDataSection case_={aCase} errors={errors} />

        <CaseDataSection case_={aCase} possibleClinicalFindings={possibleClinicalFindings} />

        <ValuesToPredictSection case_={aCase} possibleConditions={possibleConditions} />

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button type={'submit'} variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </FormContext>
    </form>
  );
};

export default CaseEditorComponent;
