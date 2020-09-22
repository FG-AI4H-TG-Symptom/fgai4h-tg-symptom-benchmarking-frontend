import React, { useMemo } from "react";

import { useForm, FormContext } from "react-hook-form";

import { Button } from "@material-ui/core";

import berlinModelSchema from "../../../data/caseSets/berlinModel.schema.json";
import { refToConcept } from "../CaseEditor/utils";
import MetaDataSection from "./MetaDataSection";
import CaseDataSection from "./CaseDataSection";
import ValuesToPredictSection from "./ValuesToPredictSection";
import { formatCaseForBackend } from "./utility";

const CaseEditorComponent: React.FC<any> = ({ case_ }) => {
  const possibleClinicalFindings = useMemo(
    () =>
      berlinModelSchema.definitions.clinicalFinding.oneOf.map(({ $ref }) =>
        refToConcept($ref)
      ),
    []
  );

  const possibleConditions = useMemo(
    () =>
      berlinModelSchema.definitions.condition.oneOf.map(({ $ref }) =>
        refToConcept($ref)
      ),
    []
  );

  console.log("case_", case_);

  const methods = useForm();
  const { handleSubmit, errors } = methods;

  const onSubmit = (data) => {
    const { caseSets } = case_;

    const case__ = formatCaseForBackend(
      data,
      possibleConditions,
      caseSets,
      possibleClinicalFindings
    );
    console.log("####submitted", case__);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContext {...methods}>
        <MetaDataSection case_={case_} errors={errors} />

        <CaseDataSection
          case_={case_}
          possibleClinicalFindings={possibleClinicalFindings}
        />

        <ValuesToPredictSection
          case_={case_}
          possibleConditions={possibleConditions}
        />

        <Button type={"submit"}>Submit</Button>
      </FormContext>
    </form>
  );
};

export default CaseEditorComponent;
