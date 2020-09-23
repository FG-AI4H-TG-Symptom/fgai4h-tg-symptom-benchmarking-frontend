import { Card, CardHeader, CardContent } from '@material-ui/core';
import React from 'react';
import OtherFeaturesSection from './OtherFeaturesSection';
import PresentingComplaintSection from './PresentingComplaintSection';
import ProfileInformationSection from './ProfileInformationSection';

const CaseDataSection: React.FC<any> = ({ case_, possibleClinicalFindings }) => {
  return (
    <Card style={{ marginTop: '10px' }}>
      <CardHeader title={'Case Data'} />
      <CardContent>
        <ProfileInformationSection case_={case_} />

        <PresentingComplaintSection case_={case_} possibleClinicalFindings={possibleClinicalFindings} />

        <OtherFeaturesSection case_={case_} possibleClinicalFindings={possibleClinicalFindings} />
      </CardContent>
    </Card>
  );
};

export default CaseDataSection;
