import React from "react";
import { FormProvider, useForm, Resolver } from "react-hook-form";
import Ajv from "ajv";
import { Box } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Save as SaveIcon } from "@material-ui/icons";

import berlinModelSchema from "../../../data/caseSets/berlinModel.schema.json";
import { Case } from "../../../data/caseSets/berlinModelTypes";
import { AutoPrefix } from "../../forms/PrefixContext";
import AllErrors from "../../forms/AllErrors";
import { validateAgainstSchema } from "../../forms/utils";
import Fab from "../../common/Fab";

import { extendWithModelInformationFromIds } from "./utils";
import CaseEditor from "./CaseEditor";

const caseSchemaValidator = new Ajv({
  coerceTypes: true,
  allErrors: true,
})
  .addSchema(berlinModelSchema)
  .compile({
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "case",
    type: "object",
    properties: {
      case: {
        $ref:
          "https://raw.githubusercontent.com/FG-AI4H-TG-Symptom/fgai4h-tg-symptom-models-schemas/master/schemas/berlin-model.schema.json#/definitions/case",
      },
    },
    required: ["case"],
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
  // eslint-disable-next-line no-unused-expressions
  values.case.caseData.presentingComplaints?.forEach((presentingComplaint) => {
    presentingComplaint.attributes = presentingComplaint.attributes || [];
  });
  values.case.caseData.otherFeatures = values.case.caseData.otherFeatures || [];
  // eslint-disable-next-line no-unused-expressions
  values.case.caseData.otherFeatures?.forEach((otherFeature) => {
    otherFeature.attributes = otherFeature.attributes || [];
  });
  values.case.valuesToPredict.impossibleConditions =
    values.case.valuesToPredict.impossibleConditions || [];
  values.case.valuesToPredict.otherRelevantDifferentials =
    values.case.valuesToPredict.otherRelevantDifferentials || [];

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

const CaseEditorComponent: React.FC<CaseSetEditorProps> = ({
  caseData,
  saveCase,
}) => {
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
