import React from 'react';
import { FormBlock } from './FormElements';
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
    <>
      <ReactHookFormSelect
        fullWidth
        id="attribute"
        name={`${magicName}.id`}
        label="Attribute"
        options={attributesOptions}
        defaultValue={selectedAttribute}
        onChange={onAttributeChange}
      />

      {valuesOptions.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <FormBlock color={'#ffc400'} title={'Value'}>
            <ReactHookFormSelect
              fullWidth
              id="value"
              name={`${magicName}.value`}
              label="Value"
              options={valuesOptions}
              defaultValue={selectedValue}
            />
          </FormBlock>
        </div>
      )}
    </>
  );
};

export default AttributeSingleSelect;
