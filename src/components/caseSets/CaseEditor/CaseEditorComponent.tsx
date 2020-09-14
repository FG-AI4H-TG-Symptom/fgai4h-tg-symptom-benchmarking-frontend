import { Box } from '@material-ui/core';
import { Save as SaveIcon } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import Ajv from 'ajv';
import React from 'react';
import { FormProvider, Resolver, useForm } from 'react-hook-form';

import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json';
import { Case } from '../../../data/caseSets/berlinModelTypes';
import Fab from '../../common/Fab';
import AllErrors from '../../forms/AllErrors';
import { AutoPrefix } from '../../forms/PrefixContext';
import { validateAgainstSchema } from '../../forms/utils';
import CaseEditor from './CaseEditor';
import { extendWithModelInformationFromIds } from './utils';

const caseSchemaValidator = new Ajv({
  coerceTypes: true,
  allErrors: true,
})
  .addSchema(berlinModelSchema)
  .compile({
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: 'case',
    type: 'object',
    properties: {
      case: {
        $ref:
          'https://raw.githubusercontent.com/FG-AI4H-TG-Symptom/fgai4h-tg-symptom-models-schemas/master/schemas/berlin-model.schema.json#/definitions/case',
      },
    },
    required: ['case'],
  });

const validationResolver: Resolver<{ case: Case }> = (rawValues) => {
  // todo: replace by a flexible and efficient solution
  const values = extendWithModelInformationFromIds(rawValues);
  if (values.case.metaData?.description?.length === 0) {
    delete values.case.metaData.description;
  }
  if (values.case.metaData?.spreadsheetCaseId?.length === 0) {
    delete values.case.metaData.spreadsheetCaseId;
  }
  if (values.case.metaData?.caseCreator?.length === 0) {
    delete values.case.metaData.caseCreator;
  }
  values.case.caseData.presentingComplaints = values.case.caseData.presentingComplaints?.map((presentingComplaint) => {
    presentingComplaint.attributes = presentingComplaint.attributes || [];
    return presentingComplaint;
  });
  values.case.caseData.otherFeatures = values.case.caseData.otherFeatures || [];
  values.case.caseData.otherFeatures = values.case.caseData.otherFeatures.map((otherFeature) => {
    otherFeature.attributes = otherFeature.attributes || [];
    return otherFeature;
  });
  values.case.valuesToPredict.impossibleConditions = values.case.valuesToPredict.impossibleConditions || [];
  values.case.valuesToPredict.otherRelevantDifferentials = values.case.valuesToPredict.otherRelevantDifferentials || [];

  // end-todo

  return validateAgainstSchema(values, caseSchemaValidator);
};

interface FormValues {
  case: Case;
}

export interface CaseSetEditorProps {
  caseData: any;
  saveCase: any;
}

const CaseEditorComponent: React.FC<CaseSetEditorProps> = ({ caseData, saveCase }) => {
  const defaultValues = { case: { ...caseData.data } };

  // add this to transfrom to correct format
  // defaultValues.case = {
  //   ...defaultValues.case,
  //   metaData: { name: "some name", description: "some description" },
  // };

  const { errors, handleSubmit, ...formMethods } = useForm({
    resolver: validationResolver,
    defaultValues: defaultValues,
  });

  return (
    <FormProvider errors={errors} handleSubmit={handleSubmit} {...formMethods}>
      <Box marginBottom={2}>
        <Alert variant="outlined" severity="warning">
          The editor is already using the Berlin model.
        </Alert>
      </Box>

      <form
        onSubmit={handleSubmit((data: FormValues): void => {
          saveCase({ ...caseData, data: data.case });
        })}
      >
        <Fab label="Save" type="submit">
          <SaveIcon />
        </Fab>

        <AllErrors />

        <AutoPrefix name="case">
          <CaseEditor />
        </AutoPrefix>
      </form>
    </FormProvider>
  );
};

export default CaseEditorComponent;
