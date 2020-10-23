import { Card, CardContent, Grid } from '@material-ui/core';
import React from 'react';
import OtherFeaturesSection from './OtherFeaturesSection';
import PresentingComplaintSection from './PresentingComplaintSection';

const CaseDataSection: React.FC<any> = ({ case_, possibleClinicalFindings }) => {
  return (
    <Card style={{ marginTop: '10px' }}>
      <CardContent>
        <Grid container direction={'row'} spacing={4}>
          <Grid item xs={6}>
            <PresentingComplaintSection case_={case_} possibleClinicalFindings={possibleClinicalFindings} />
          </Grid>
          <Grid item xs={6}>
            <OtherFeaturesSection case_={case_} possibleClinicalFindings={possibleClinicalFindings} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CaseDataSection;
