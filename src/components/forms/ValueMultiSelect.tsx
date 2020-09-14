import { Box, Button, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { BaseNamedConcept } from '../../data/util/baseConceptTypes';
import { AutoPrefix } from './PrefixContext';
import { useAutoFieldArray, useWatchArrayHelper } from './utils';
import ValueSelect from './ValueSelect';

interface ValueMultiSelectProps {
  name: string;
  possibleValues: Array<BaseNamedConcept>;
}

const ValueMultiSelect: React.FC<ValueMultiSelectProps> = ({ name, possibleValues }) => {
  const {
    formState: { isSubmitted },
  } = useFormContext();
  const values = useAutoFieldArray({
    name: 'values',
  });

  const currentValueIds = useWatchArrayHelper(values, `${name}[*].id`);

  return (
    <>
      {isSubmitted && values.fields.length === 0 ? (
        <Alert severity="error" variant="outlined">
          Add at least one value
        </Alert>
      ) : null}
      {values.fields.map((item, index) => (
        <Box display="flex" key={item.key}>
          <AutoPrefix name={`${name}[${index}]`}>
            <ValueSelect
              possibleValues={possibleValues.filter(
                ({ id }) => id === currentValueIds[index] || !currentValueIds.includes(id),
              )}
            />
          </AutoPrefix>
          <IconButton onClick={(): void => values.remove(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button onClick={(): void => values.append({})}>Add value</Button>
    </>
  );
};

export default ValueMultiSelect;
