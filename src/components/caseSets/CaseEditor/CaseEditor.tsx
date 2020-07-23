import React, { useMemo } from "react";
import { Box, Grid, MenuItem } from "@material-ui/core";

import berlinModelSchema from "../../../data/caseSets/berlinModel.schema.json";
import FormSection from "../../forms/FormSection";
import FormBlock from "../../forms/FormBlock";
import AutoTextField from "../../forms/AutoTextField";
import AutoSelect from "../../forms/AutoSelect";
import AutoArrayFormBlock from "../../forms/AutoArrayFormBlock";

import ClinicalFindingSelect from "./ClinicalFindingSelect";
import ConditionSelect from "./ConditionSelect";
import { refToConcept } from "./utils";

const CaseEditor: React.FC<{}> = () => {
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

  return (
    <>
      <FormSection title="Meta data" name="metaData">
        <AutoTextField
          label="Case name"
          type="text"
          name="name"
          autoComplete="off"
        />
        <AutoTextField
          label="Case description"
          type="text"
          name="description"
          autoComplete="off"
          optional
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <AutoTextField
              label={`Identifier of the case's creator`}
              type="text"
              name="caseCreator"
              optional
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <AutoTextField
              label="Spreadsheet ID"
              type="text"
              name="spreadsheetCaseId"
              autoComplete="off"
              optional
            />
          </Grid>
        </Grid>
      </FormSection>

      <FormSection title="Case data" name="caseData">
        <FormBlock
          name="profileInformation"
          color="#a6a6f7"
          title="Profile information"
        >
          <Grid container spacing={2}>
            <Grid item xs={3} md={2} lg={1}>
              <AutoTextField name="age" type="number" label="Age" />
            </Grid>
            <Grid item xs={6} md={3} lg={2}>
              <AutoSelect label="Biological sex" name="biologicalSex">
                {berlinModelSchema.definitions.biologicalSex.enum.map(
                  (biologicalSex) => (
                    <MenuItem key={biologicalSex} value={biologicalSex}>
                      {biologicalSex}
                    </MenuItem>
                  )
                )}
              </AutoSelect>
            </Grid>
          </Grid>
        </FormBlock>

        <FormBlock
          name="presentingComplaints[0]"
          color="#67c567"
          title="Presenting complaint"
        >
          <ClinicalFindingSelect possibleValues={possibleClinicalFindings} />
        </FormBlock>

        <AutoArrayFormBlock
          title="Other features"
          name="otherFeatures"
          color="#deae37"
          formComponent={ClinicalFindingSelect}
          possibleValues={possibleClinicalFindings}
        />
      </FormSection>

      <FormSection title="Values to predict" name="valuesToPredict">
        <Box marginBottom={2}>
          <AutoSelect name="expectedTriageLevel" label="Expected triage level">
            {berlinModelSchema.definitions.expectedTriageLevel.enum.map(
              (expectedTriageLevel) => (
                <MenuItem key={expectedTriageLevel} value={expectedTriageLevel}>
                  {expectedTriageLevel}
                </MenuItem>
              )
            )}
          </AutoSelect>
        </Box>

        <FormBlock
          name="expectedCondition"
          color="#a6a6f7"
          title="Expected condition"
        >
          <ConditionSelect possibleValues={possibleConditions} />
        </FormBlock>

        <AutoArrayFormBlock
          title="Other relevant differentials"
          name="otherRelevantDifferentials"
          color="#67c567"
          formComponent={ConditionSelect}
          possibleValues={possibleConditions}
        />

        <AutoArrayFormBlock
          title="Impossible conditions"
          name="impossibleConditions"
          color="#deae37"
          formComponent={ConditionSelect}
          possibleValues={possibleConditions}
        />

        <FormBlock
          name="correctCondition"
          color="#e491e8"
          title="Correct condition"
        >
          <ConditionSelect possibleValues={possibleConditions} />
        </FormBlock>
      </FormSection>
    </>
  );
};

export default CaseEditor;
