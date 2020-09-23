import React from 'react';
import ClinicalFindingComponent from './ClinicalFindingComponent';
import { FormBlock } from './FormElements';

const PresentingComplaintSection: React.FC<any> = ({ case_, possibleClinicalFindings }) => {
  const clinicalFinding = case_.data.caseData.presentingComplaints[0];

  const nameInObject = `caseData.presentingComplaints[0]`;

  return (
    <FormBlock name="presentingComplaints" color="#67c567" title="Presenting complaint">
      <ClinicalFindingComponent
        clinicalFinding={clinicalFinding}
        nameInObject={nameInObject}
        possibleClinicalFindings={possibleClinicalFindings}
      />
    </FormBlock>
  );
};

export default PresentingComplaintSection;
