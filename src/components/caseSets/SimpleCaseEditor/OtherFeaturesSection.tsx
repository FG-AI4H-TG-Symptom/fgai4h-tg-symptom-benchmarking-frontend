import React, { Fragment, useEffect, useState } from 'react';
import { v1 as uuid } from 'uuid';
import { Button, Grid, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import ClinicalFindingComponent from './ClinicalFindingComponent';
import { FormBlock } from './FormElements';

const selectFinding = (newId, sectionState, fieldId, possibleClinicalFindings) => {
  const { otherFeatures } = sectionState;

  let newlyChosenFinding = possibleClinicalFindings.find((finding) => finding.id === newId);

  const restFindings = otherFeatures.filter((finding) => finding.fieldId !== fieldId);

  newlyChosenFinding = {
    ...newlyChosenFinding,
    attributes: [],
    fieldId: fieldId,
  };

  const newFindings = [...restFindings, newlyChosenFinding];

  const takenFindingIds = newFindings.map((finding) => finding.id);

  const newAvailableFindings = possibleClinicalFindings.filter((finding) => !takenFindingIds.includes(finding.id));

  const result = {
    otherFeatures: newFindings,
    availableFindings: newAvailableFindings,
  };

  return result;
};

const OtherFeaturesSection: React.FC<any> = ({ case_, possibleClinicalFindings }) => {
  const { otherFeatures } = case_.data.caseData;

  const [sectionState, setSectionState] = useState({
    otherFeatures: [],
    availableFindings: [],
  });

  // initial state set up
  useEffect(() => {
    let preselectedOtherFeatures = case_.data.caseData.otherFeatures;

    if (!otherFeatures) {
      return;
    }

    const preselectedFindingIds = preselectedOtherFeatures.map((finding) => finding.id);
    const nonTakenFindings = possibleClinicalFindings.filter((finding) => !preselectedFindingIds.includes(finding.id));

    preselectedOtherFeatures = preselectedOtherFeatures.map((finding) => {
      return {
        ...finding,
        fieldId: uuid(),
      };
    });

    const initialState = {
      otherFeatures: preselectedOtherFeatures,
      availableFindings: nonTakenFindings,
    };

    setSectionState(initialState);
  }, []);

  const removeFinding = (fieldId) => {
    const newFindings = [...sectionState.otherFeatures.filter((finding) => finding.fieldId !== fieldId)];

    const removedFinding = sectionState.otherFeatures.find((attr) => attr.fieldId === fieldId);

    let newAvailableFindings = [...sectionState.availableFindings];
    if (removedFinding.id !== '') {
      newAvailableFindings = [...sectionState.availableFindings, removedFinding];
    }

    setSectionState({
      ...sectionState,
      otherFeatures: newFindings,
      availableFindings: newAvailableFindings,
    });
  };

  const addFinding = () => {
    const newFinding = {
      id: '',
      attributes: [],
      fieldId: uuid(),
      state: '',
    };

    const newOtherFeatures = [...sectionState.otherFeatures, newFinding];

    setSectionState({ ...sectionState, otherFeatures: newOtherFeatures });
  };

  const numOfFindings = sectionState.otherFeatures.length;
  const totalNumOfFindings = possibleClinicalFindings.length;

  return (
    <FormBlock color="#e491e8" title="Other Features">
      {sectionState.otherFeatures.map((clinicalFinding, index) => {
        const magicName = `caseData.otherFeatures[${index}]`;

        let possibleFindings = [...sectionState.availableFindings];

        if (clinicalFinding.id !== '') {
          possibleFindings = [...sectionState.availableFindings, clinicalFinding];
        }

        return (
          <Grid container spacing={2} key={`grid${clinicalFinding.fieldId}`}>
            <Grid item xs={11}>
              <Fragment key={`fragment${clinicalFinding.fieldId}`}>
                <ClinicalFindingComponent
                  clinicalFinding={clinicalFinding}
                  nameInObject={magicName}
                  possibleClinicalFindings={possibleFindings}
                  onClinicalFindingChange={
                    // (e) => {console.log('ggugu', e);}
                    (newId) => {
                      const newState = selectFinding(
                        newId,
                        sectionState,
                        clinicalFinding.fieldId,
                        possibleClinicalFindings,
                      );

                      setSectionState({ ...newState });
                    }
                  }
                />
                <div style={{ marginBottom: '30px' }}>{'   '} </div>
              </Fragment>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={() => {
                  removeFinding(clinicalFinding.fieldId);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}

      <Button
        onClick={() => {
          addFinding();
        }}
        disabled={numOfFindings >= totalNumOfFindings}
      >
        Add Clinical Finding
      </Button>
    </FormBlock>
  );
};

export default OtherFeaturesSection;
