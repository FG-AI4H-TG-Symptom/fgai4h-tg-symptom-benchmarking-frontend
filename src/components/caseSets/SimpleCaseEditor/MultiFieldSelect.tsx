import React, { useEffect, useState } from 'react';
import { v1 as uuid } from 'uuid';
import { Button, Grid, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

import ReactHookFormSelect from './ReactHookFormSelect';
import { getSelectOptions } from './utility';

const MultiFieldSelect: React.FC<any> = ({
  availableItems,
  preselectedItems,
  magicName,
  onChange,
  possibleItems,
  onConditionDeleted,
  addDisabled,
}) => {
  const [items, setItems] = useState([]);

  // fill preselected items
  useEffect(() => {
    const newItems = preselectedItems.map((item) => {
      return { id: item.id, fieldId: uuid() };
    });
    setItems(newItems);
  }, []);

  const addItem = () => {
    const newItem = {
      id: '',
      fieldId: uuid(),
    };

    setItems([...items, newItem]);
  };

  const removeItem = (fieldId) => {
    const newItems = items.filter((item) => item.fieldId !== fieldId);
    setItems(newItems);
  };

  return (
    <div>
      {items.map((item, index) => {
        let newAvailableItems = availableItems;
        if (item.id !== '') {
          const selectedItem = possibleItems.find((cond) => cond.id === item.id);
          newAvailableItems = [...availableItems, selectedItem];
        }

        const options = getSelectOptions(newAvailableItems);

        return (
          <Grid container spacing={2} key={item.fieldId}>
            <Grid item xs={10}>
              <div style={{ marginBottom: '30px' }} key={`div${item.fieldId}`}>
                <ReactHookFormSelect
                  fullWidth
                  name={`${magicName}[${index}].id`}
                  label="Condition"
                  options={options}
                  defaultValue={item.id}
                  onChange={(e) => {
                    const newId = e[0].target.value;
                    const oldId = item.id;

                    const newItems = [...items];
                    const changedItem = newItems.find((it) => it.fieldId === item.fieldId);
                    changedItem.id = newId;

                    // let newItems = items.filter( (it) => it.fieldId !== item.fieldId);
                    // newItems = [  ...newItems,{ id: newId, fieldId: item.fieldId },];

                    setItems(newItems);
                    onChange(oldId, newId);
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={() => {
                  onConditionDeleted(item.id);
                  removeItem(item.fieldId);
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
          addItem();
        }}
        disabled={addDisabled}
      >
        Add
      </Button>
    </div>
  );
};

export default MultiFieldSelect;
