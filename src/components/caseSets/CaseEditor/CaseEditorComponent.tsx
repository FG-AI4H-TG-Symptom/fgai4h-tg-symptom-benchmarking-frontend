import React from 'react';
import { FormContext, useForm, ValidationResolver } from 'react-hook-form';
import Ajv from 'ajv';

import { Save as SaveIcon } from '@material-ui/icons';

import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json';
import { Case } from '../../../data/caseSets/berlinModelTypes';
import { AutoPrefix } from '../../forms/PrefixContext';
import AllErrors from '../../forms/AllErrors';
import { validateAgainstSchema } from '../../forms/utils';
import Fab from '../../common/Fab';

import { extendWithModelInformationFromIds } from './utils';
import CaseEditor from './CaseEditor';

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

const validationResolver: ValidationResolver<{ case: Case }> = (rawValues) => {
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

// interface FormValues {
//   case: Case;
// }

export interface CaseSetEditorProps {
  caseData: any;
  saveCase: any;
}

const CaseEditorComponent: React.FC<CaseSetEditorProps> = ({ caseData }) => {
  const defaultValues = { case: { ...caseData.data } };
  // console.log('defaultValues', defaultValues);
  const { errors, handleSubmit, ...formMethods } = useForm({
    validationResolver: validationResolver,
    defaultValues: defaultValues,
  });

  return (
    <FormContext errors={errors} handleSubmit={handleSubmit} {...formMethods}>
      <form
      // onSubmit={handleSubmit((data: FormValues): void => {
      //   // saveCase({ ...caseData, data: data.case });
      //   console.log('datadata', data);
      // })}
      >
        <Fab label="Save" type="submit">
          <SaveIcon />
        </Fab>

        <AllErrors />

        <AutoPrefix name="case">
          <CaseEditor />
        </AutoPrefix>
      </form>
    </FormContext>
  );
};

export default CaseEditorComponent;
