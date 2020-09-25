import React, { useEffect, useState } from 'react';
import ClinicalFindingComponent from './ClinicalFindingComponent';
import { FormBlock } from './FormElements';

const PresentingComplaintSection: React.FC<any> = ({ case_, possibleClinicalFindings }) => {
  const nameInObject = `caseData.presentingComplaints[0]`;

  const [clinicalFinding, setClinicalFinding] = useState(null);

  useEffect(() => {
    setClinicalFinding(case_.data.caseData.presentingComplaints[0]);
  }, []);

  return (
    <FormBlock name="presentingComplaints" color="#67c567" title="Presenting complaint">
      {clinicalFinding && (
        <ClinicalFindingComponent
          clinicalFinding={clinicalFinding}
          nameInObject={nameInObject}
          possibleClinicalFindings={possibleClinicalFindings}
          onClinicalFindingChange={(newId) => {
            const newFinding = possibleClinicalFindings.find((cf) => cf.id === newId);
            setClinicalFinding(newFinding);
          }}
        />
      )}
    </FormBlock>
  );
};

export default PresentingComplaintSection;
