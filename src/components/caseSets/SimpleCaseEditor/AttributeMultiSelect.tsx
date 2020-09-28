import { Box, Chip, FormControl, makeStyles, Select } from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormBlock } from './FormElements';
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

          return <Chip key={valueId} label={value.name} className={classes.chip} />;
        })}
      </div>
    );
  };

  return (
    <>
      <ReactHookFormSelect
        fullWidth
        id="attribute"
        name={`${magicName}.id`}
        label="Multi-Select Attribute"
        options={attributesOptions}
        defaultValue={selectedAttribute}
        onChange={onAttributeChange}
      />

      <div style={{ marginTop: '10px' }}>
        <FormBlock color={'#ffc400'} title={'Values'}>
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
        </FormBlock>

        {/* <Button
          onClick={() => {
            console.log("getValues", getValues());
          }}
        >
          Show values
        </Button> */}
      </div>
    </>
  );
};

export default AttributeMultiSelect;
