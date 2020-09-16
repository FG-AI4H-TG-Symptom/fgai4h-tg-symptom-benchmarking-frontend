import React, { Fragment } from "react";
import ClinicalFindingComponent from "./ClinicalFindingComponent";
import { FormBlock } from "./FormElements";

const OtherFeaturesSection: React.FC<any> = ({
  case_,
  possibleClinicalFindings,
}) => {
  const { otherFeatures } = case_.data.caseData;

  return (
    <FormBlock name="otherFeatures" color="#e491e8" title="Other Features">
      {otherFeatures.map((clinicalFinding, index) => {
        const magicName = `caseData.otherFeatures[${index}]`;

        return (
          <Fragment key={`fragment${clinicalFinding.id}`}>
            <ClinicalFindingComponent
              clinicalFinding={clinicalFinding}
              nameInObject={magicName}
              possibleClinicalFindings={possibleClinicalFindings}
            />
            <div style={{ marginBottom: "30px" }}>{"   "} </div>
          </Fragment>
        );
      })}
    </FormBlock>
  );
};

export default OtherFeaturesSection;
