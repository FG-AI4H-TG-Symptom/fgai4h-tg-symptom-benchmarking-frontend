import React from 'react';
import { IconButton, MenuItem } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

import { BaseNamedConcept } from '../../../data/util/baseConceptTypes';
import AutoSelect from '../../forms/AutoSelect';
import { ArrayFormComponentProps } from '../../forms/AutoArrayFormBlock';

interface ConditionSelectProps {
  name?: string;
}

type ConditionSelectPropsCombined = ConditionSelectProps &
  (ArrayFormComponentProps | { possibleValues: Array<BaseNamedConcept> });

const ConditionSelect: React.FC<ConditionSelectPropsCombined> = ({ name, possibleValues, ...props }) => {
  const fieldName = name ? `${name}.id` : 'id';

  return (
    <>
      <AutoSelect name={fieldName} label="Condition">
        {possibleValues.map((value) => (
          <MenuItem key={value.id} value={value.id}>
            {value.name}
          </MenuItem>
        ))}
      </AutoSelect>
      {'onRemove' in props ? (
        <IconButton onClick={props.onRemove}>
          <DeleteIcon />
        </IconButton>
      ) : null}
    </>
  );
};

export default ConditionSelect;
