import React from 'react';
import { MenuItem } from '@material-ui/core';

import { BaseNamedConcept } from '../../data/util/baseConceptTypes';
import AutoSelect from './AutoSelect';

interface ValueSelectProps {
  possibleValues: Array<BaseNamedConcept>;
  name?: string;
}

const ValueSelect: React.FC<ValueSelectProps> = ({ possibleValues, name }) => {
  const fieldName = name ? `${name}.id` : 'id';

  return (
    <AutoSelect name={fieldName} label="Value">
      {possibleValues.map((value) => (
        <MenuItem key={value.id} value={value.id}>
          {value.name}
        </MenuItem>
      ))}
    </AutoSelect>
  );
};

export default ValueSelect;
