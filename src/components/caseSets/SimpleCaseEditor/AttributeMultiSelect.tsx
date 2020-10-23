import { Box, Chip, FormControl, Grid, makeStyles, Select } from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ReactHookFormSelect from './ReactHookFormSelect';

const AttributeMultiSelect: React.FC<any> = ({
  possibleValues,
  magicName,
  selectedAttribute,
  onAttributeChange,
  selectedValue,
  attributesOptions,
  valuesOptions,
}) => {
  const { control } = useFormContext();

  const useStyles = makeStyles(() => ({
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
  }));

  const classes = useStyles();

  const renderOptions = (selected) => {
    return (
      <div className={classes.chips}>
        {selected.map((valueId) => {
          const value = possibleValues.find((val) => val.id === valueId);

          if (!value) {
            return <span key={valueId} />;
          }

          return <Chip key={valueId} size="small" label={value.name} className={classes.chip} />;
        })}
      </div>
    );
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <ReactHookFormSelect
          fullWidth
          id="attribute"
          name={`${magicName}.id`}
          label="Multi-Select Attribute"
          options={attributesOptions}
          defaultValue={selectedAttribute}
          onChange={onAttributeChange}
        />
      </Grid>
      <Grid item xs={6}>
        <Box display="flex" key={`box-values`}>
          <FormControl fullWidth>
            <Controller
              fullWidth
              as={<Select multiple>{valuesOptions}</Select>}
              name={`${magicName}.value`}
              control={control}
              defaultValue={selectedValue || []}
              renderValue={(selected: any) => renderOptions(selected)}
            />
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AttributeMultiSelect;
