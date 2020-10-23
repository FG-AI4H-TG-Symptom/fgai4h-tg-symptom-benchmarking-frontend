import { Card, CardContent, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { FormBlock } from './FormElements';
import MultiFieldSelect from './MultiFieldSelect';

const ValuesToPredictSection: React.FC<any> = ({ case_, possibleConditions }) => {
  // chosenConditions are shared between impossible and relevant
  const [takenConditionIds, setTakenConditionIds] = useState([]);

  // fill chosen conditionds according to preselected ones
  useEffect(() => {
    const otherRelevantDifferentials = case_?.data.valuesToPredict.otherRelevantDifferentials || [];
    const impossibleConditions = case_?.data.valuesToPredict.impossibleConditions || [];

    const impossibleIds = impossibleConditions.map((cond) => cond.id);
    const otherRelevantIds = otherRelevantDifferentials.map((cond) => cond.id);
    const preselectedIds = [...impossibleIds, ...otherRelevantIds];

    setTakenConditionIds(preselectedIds);
  }, []);

  const numberOfSelected = takenConditionIds.length;
  const totalNumber = possibleConditions.length;
  const addDisabled = numberOfSelected >= totalNumber;

  const availableConditions = possibleConditions.filter((cond) => !takenConditionIds.includes(cond.id));

  const onConditionSelected = (oldId, newId) => {
    let newTaken = takenConditionIds.filter((id) => id !== oldId);
    newTaken = [...newTaken, newId];
    setTakenConditionIds(newTaken);
  };

  const onConditionDeleted = (oldId) => {
    const newTaken = takenConditionIds.filter((id) => id !== oldId);
    setTakenConditionIds(newTaken);
  };

  const counterText = `\u00A0\u00A0${numberOfSelected}/${totalNumber}`;

  return (
    <Card>
      <CardContent>
        <Grid container direction={'row'} spacing={4}>
          <Grid item xs={6}>
            <FormBlock color="#ff80ab" title={`Relevant Differentials ${counterText}`}>
              <MultiFieldSelect
                availableItems={availableConditions}
                preselectedItems={case_?.data.valuesToPredict.otherRelevantDifferentials || []}
                magicName={'valuesToPredict.otherRelevantDifferentials'}
                onChange={onConditionSelected}
                possibleItems={possibleConditions}
                onConditionDeleted={onConditionDeleted}
                addDisabled={addDisabled}
              />
            </FormBlock>
          </Grid>
          <Grid item xs={6}>
            <FormBlock color="#ff80ab" title={`Impossible Conditions ${counterText}`}>
              <MultiFieldSelect
                availableItems={availableConditions}
                preselectedItems={case_?.data.valuesToPredict.impossibleConditions || []}
                magicName={'valuesToPredict.impossibleConditions'}
                onChange={onConditionSelected}
                possibleItems={possibleConditions}
                onConditionDeleted={onConditionDeleted}
                addDisabled={addDisabled}
              />
            </FormBlock>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ValuesToPredictSection;
