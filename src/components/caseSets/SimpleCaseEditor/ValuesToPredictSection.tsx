import { Card, CardHeader, CardContent } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import ReactHookFormSelect from './ReactHookFormSelect';
import { getSelectOptions, getPlainOptions } from './utility';
import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json';
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

  const triageLevels = berlinModelSchema.definitions.expectedTriageLevel.enum;
  const triageOptions = getPlainOptions(triageLevels);

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
    <Card style={{ marginTop: '10px' }}>
      <CardHeader title={'Values to Predict'} />
      <CardContent>
        <ReactHookFormSelect
          fullWidth
          id="expectedTriageLevel"
          name={`valuesToPredict.expectedTriageLevel`}
          label="Triage Level"
          options={triageOptions}
          defaultValue={case_?.data.valuesToPredict.expectedTriageLevel || ''}
        />

        <div style={{ marginTop: '30px' }}>
          <FormBlock color="#a6a6f7" title="Expected condition">
            <ReactHookFormSelect
              fullWidth
              id="expectedCondition"
              name={`valuesToPredict.expectedCondition.id`}
              label="Condition"
              options={getSelectOptions(possibleConditions)}
              defaultValue={case_?.data.valuesToPredict.expectedCondition.id || ''}
            />
          </FormBlock>
        </div>

        <div style={{ marginTop: '30px' }}>
          <FormBlock color="#e491e8" title="Correct condition">
            <ReactHookFormSelect
              fullWidth
              id="correctCondition"
              name={`valuesToPredict.correctCondition.id`}
              label="Condition"
              options={getSelectOptions(possibleConditions)}
              defaultValue={case_?.data.valuesToPredict.correctCondition.id || ''}
            />
          </FormBlock>
        </div>

        <div style={{ marginTop: '30px' }}>
          <FormBlock color="#67c567" title={`Other Relevant Differentials ${counterText}`}>
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
        </div>

        <div style={{ marginTop: '30px' }}>
          <FormBlock color="#67c567" title={`Impossible Conditions ${counterText}`}>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ValuesToPredictSection;
