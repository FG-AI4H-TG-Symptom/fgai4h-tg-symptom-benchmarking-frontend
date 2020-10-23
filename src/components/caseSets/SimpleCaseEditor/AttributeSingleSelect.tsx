import { Grid } from '@material-ui/core';
import React from 'react';
import ReactHookFormSelect from './ReactHookFormSelect';

const AttributeSingleSelect: React.FC<any> = ({
  magicName,
  selectedAttribute,
  onAttributeChange,
  selectedValue,
  attributesOptions,
  valuesOptions,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <ReactHookFormSelect
          fullWidth
          id="attribute"
          name={`${magicName}.id`}
          label="Attribute"
          options={attributesOptions}
          defaultValue={selectedAttribute}
          onChange={onAttributeChange}
        />
      </Grid>

      <Grid item xs={6}>
        {valuesOptions.length > 0 && (
          <ReactHookFormSelect
            fullWidth
            id="value"
            name={`${magicName}.value`}
            label="Value"
            options={valuesOptions}
            defaultValue={selectedValue}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default AttributeSingleSelect;
